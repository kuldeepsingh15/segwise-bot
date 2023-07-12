module.exports =
    class SlackService{
        constructor(allErrors,generalConfig,apiHelpers,repoInstance,helpers,openAI) {
            this.errors = allErrors
            this.repoInstance = repoInstance
            this.apiHelpers = apiHelpers
            this.helpers = helpers
            this.generalConfig = generalConfig
            this.openAI = openAI
        }
        appMention = async (content, userId, thread, teamId, channelId) => {
            let accessToken;
            try {
                //get access-token from db
                let channel = await this.repoInstance.channelExist(channelId);
                if (!channel) await this.botAddedToChannel(channelId, teamId);
                accessToken = await this.repoInstance.getAccessToken(channelId);
                if (!accessToken) throw this.errors.unableToGetAccessToken(channelId, "channel not present");
                //get sql query from text
                let sqlQuery = await this.openAI.textToSQL(content);
                let check = await this.openAI.isValidQuery(sqlQuery); console.log(111,check)
                if ( check == 'false') throw new Error('Not a valid question');
                //get result from sql query's result
                let result = await this.repoInstance.searchAnalyticalData(sqlQuery);
                let answer = await this.openAI.sqlToText(content, sqlQuery, result);
                console.log(answer)
                //apiHelper
                let response = await this.apiHelpers.sendSlackMessage(accessToken, channelId, thread, `<@${userId}> ${answer}`);
                if (!response.ok) {
                    throw this.errors.unableToSendSlackMessage(channelId,response.error);
                }
                return {
                    status: 'success'
                };
            } catch (err) {
                console.log(err)
                await this.apiHelpers.sendSlackMessage(accessToken, channelId, thread, `<@${userId}> Oops, this question is not in my scope yet. Will work on this.`);
            }
        }
        botAddedToChannel = async (channelId, teamId) => {
            try {
                let response = await this.repoInstance.addChannel(channelId, teamId);
                this.apiHelpers.addNewChannelToRoutines(new Date().getMinutes(), channelId);                
                console.log(response);
            } catch (err) {
                throw err;
            }
        }
        registerOAuth = async (code) => {
            try {
                let response = await this.apiHelpers.getSlackAccessCode(code);
                if (!response.ok) {
                    console.log(response.error)
                    throw this.errors.oAuthFailed(response.error);
                }
                //set access token
                await this.repoInstance.addAccessToken(response.team.id, response.incoming_webhook.channel_id, response.access_token);
                const redirect_uri = `app.slack.com/client/${response.team.id}/${response.incoming_webhook.channel_id}`;
                return this.helpers.generateOAuthRedirectPage(redirect_uri);
            } catch (err) {
                throw err;
            }
        }
    }