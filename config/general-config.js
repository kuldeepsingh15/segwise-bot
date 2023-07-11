const path = require('path')
require('dotenv').config();

module.exports = {
    mySlackToken: process.env.MY_SLACK_TOKEN ?? "",
    myClientId: process.env.CLIENT_ID??"",
    myClientSecret: process.env.CLIENT_SECRET ?? "",
    openAiOrganisation: process.env.OPENAI_ORGANISATION ?? "",
    openAiSecret: process.env.OPENAI_SECRET ?? "",
    routinesURL: process.env.ROUTINES_URL??""
}