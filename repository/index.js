const sqlite3 = require("sqlite3").verbose();
const { open } = require('sqlite')
const allErrors = require('../config/allErrors')
let analyticalDataDB, teamTokenDB;
(dbConnect = async () => {
    [analyticalDataDB, teamTokenDB] = await Promise.all([
        open({
            filename: 'repository/analyticalData.db',
            driver: sqlite3.cached.Database
        }),
        open({
            filename: 'repository/teamTokens.db',
            driver: sqlite3.cached.Database
        }),
    ]);
    //await teamTokenDB.run('DELETE FROM Channels')
})();
const addAccessToken = async (teamID,channel,accessToken) => {
    try {
        const sql = `INSERT OR IGNORE INTO TeamAccessTokens (teamID, accessToken) VALUES ($teamID, $accessToken)`;
        const params = {
            $teamID:teamID,
            $accessToken:accessToken
        };
        let response = await teamTokenDB.run(sql, params);
        console.log("Successful added team: ",teamID);
    } catch (err) {
        throw allErrors.unableToAddAccessToken(teamID, channel, err);
    }
}
const addChannel = async (channel,teamID) => {
    try {
        let sql1 = `SELECT id FROM TeamAccessTokens WHERE teamID = $teamID`;
        let row = await teamTokenDB.get(sql1, { $teamID: teamID });
        if (!row?.id) throw allErrors.unableToAddChannel(teamID, channel, "Team not present");
        let sql2 = `INSERT OR IGNORE INTO Channels (channelID, teamID) VALUES ($channelID, $teamID)`;
        let response = await teamTokenDB.run(sql2, { $channelID: channel, $teamID: row.id });
        console.log("Successful added channel: ", channel);
    } catch (err) {
        console.log(err)
        throw err;
    }
}
const getAccessToken = async (channelID) => {
    try {
        let sql = `SELECT t.accessToken FROM TeamAccessTokens t JOIN Channels c ON t.id = c.teamID WHERE c.channelID = ?`;
        let response = await teamTokenDB.get(sql, [channelID]);
        if (!response) {
            console.log('No access token found for the specified channel ID: ', channelID);
            return undefined;
        }
        return response.accessToken
    } catch (err) {
        throw err;
    }
}
const searchAnalyticalData = async (sql) => {
    try {
        let resposne = await analyticalDataDB.all(sql);
        return resposne;
    } catch (err) {
        throw err;
    }
}
const channelExist = async (channelId) => {
    try {
        let sql = `SELECT id FROM Channels WHERE channelID = $channelID`;
        let response = await teamTokenDB.get(sql, { $channelID: channelId });
        return response?.id ? true : false;
    } catch (err) {
        throw err;
    }
}
module.exports = {
    addAccessToken,
    addChannel,
    searchAnalyticalData,
    getAccessToken,
    channelExist
}