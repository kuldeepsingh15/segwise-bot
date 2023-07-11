const repoInstance = require("../repository")
const allErrors = require("../config/allErrors")
const generalConfig = require("../config/general-config")
const apiHelpers = require("../helpers/apiHelpers")
const helpers = require("../helpers")
const slackService = require("./slack");
const openAI = require('../helpers/openAI');
const slackServiceInstance = new slackService(allErrors,generalConfig,apiHelpers,repoInstance,helpers,openAI);
module.exports = {
    slackServiceInstance,
}