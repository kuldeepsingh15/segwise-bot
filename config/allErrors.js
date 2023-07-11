class BotError extends Error {
    constructor(errorCode, errorDescription) {
        super(errorCode);
        this.errorCode = errorCode;
        this.errorDescription = errorDescription;
    }
}
module.exports = {
    BotError,
    unableToSendSlackMessage: (channelId, cause) => { return new BotError("unableToSendSlackMessage", `Error in posting slack message for ${channelId} due to ${cause}`) },
    unexpectedError: new BotError("unexpectedError", "Some unexpected error occured please try after some time"),
    oAuthFailed: (cause) => { return new BotError("oAuthFailed", `Error in oAuth due to ${cause}`) },
    unableToAddAccessToken: (team, channel, err) => { return new BotError("unableToAddAccessToken", `Access token cannot be added for team: ${team} and channel: ${channel} due to ${err}`) },
    unableToAddChannel: (team, channel, err) => { return new BotError("unableToAddChannel", `Channel cannot be added for team: ${team} and channel: ${channel} due to ${err}`) },
    unableToGetAccessToken: (channel, err) => { return new BotError("unableToGetAccessToken", `Cannot get access token for channel: ${channel} due to ${err}`) },
}