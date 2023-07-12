//const allErrors = require('../../domain/allErrors');
const axios = require('axios');
const generalConfig = require('../config/general-config');
const sendSlackMessage = async (accessToken, channelId, thread, text) => {
    try {
        let requestBody = {
            "channel": channelId, text
        };
        if (thread) requestBody.thread_ts = thread;
        let response = await axios({
            method: 'post',
            url: 'https://slack.com/api/chat.postMessage',
            headers: { "Authorization": `Bearer ${accessToken}` },
            data: requestBody ?? {}
        });
        return response.data;
    } catch (err) {
        throw err;
    }
}
const getSlackAccessCode = async (code) => {
    try {
        let headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        };
        let data = {
            client_id: generalConfig.myClientId,
            client_secret: generalConfig.myClientSecret,
            code
        };
        let response = await axios({
            method: 'post',
            url: 'https://slack.com/api/oauth.v2.access',
            headers, data
        });
        return response.data;
    } catch (err) {
        throw err;
    }
}
const addNewChannelToRoutines = async (mint, channelId,retry=0) => {
    try {
        if (retry === 3) {
            console.error("cannot add channel to routines: ", channelId);
            return;
        }
        let response = await axios({
            method: 'post',
            url: generalConfig.routinesURL,
            data: {mint,channelId}
        });
        return response.data;
    } catch (err) {
        console.log(err)
        return addNewChannelToRoutines(mint, channelId,retry+1)
    }
}
module.exports = {
    sendSlackMessage,
    getSlackAccessCode,
    addNewChannelToRoutines
}