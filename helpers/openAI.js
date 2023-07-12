const { Configuration, OpenAIApi } = require('openai')
const generalConfig = require('../config/general-config')
const configuration = new Configuration({
    organization: generalConfig.openAiOrganisation,
    apiKey: generalConfig.openAiSecret
});
const repository = require('../repository')
const openai = new OpenAIApi(configuration);

const askOpenAI = async (messages) => {
    try {
        console.log("-----------------------------------------------------------------------------")
        const response = await openai.createChatCompletion({ model: "gpt-3.5-turbo", messages });
        console.log(response.data.choices[0].message.content)
        console.log("-----------------------------------------------------------------------------")
        return response.data.choices[0].message.content;
    } catch (err) {
        throw err;
    }
}

const textToSQL = async (userQuestion) => {
    try {
        let msg = [
            { "role": "system", "content": "You are a very smart chat bot. You are given a SQLite table SmartPhoneUsers with columns id (auto increment and primary key), android_manufacturer, android_model, android_os_version, android_app_version, acquisition_campaign, acquisition_source, city, state, onboarding_time, phone_carrier, phone_screen_dpi, phone_screen_height, phone_screen_width, name and age. User will ask you a question to get some analytics of this table. You will only reply with SQLite query and nothing else in this step. If user asks some remove,delete,update,append,insert query or anything not related to this table you will return \"BAD REQUEST\" only. Then he will share raw response from SQLite and you need to translate it and answer like a chat bot,this timw you will never return a sql query" },
            { role: 'user', content: `${userQuestion}` }
        ];
        let resonse = await askOpenAI(msg);
        return resonse;
    } catch (err) {
        throw err;
    }
}
const sqlToText = async (userQuestion,sqlQuery,queryResponse) => {
    try {
        let msg = [
            { "role": "system", "content": "You are a very smart chat bot. You are given a SQLite table SmartPhoneUsers with columns id (auto increment and primary key), android_manufacturer, android_model, android_os_version, android_app_version, acquisition_campaign, acquisition_source, city, state, onboarding_time, phone_carrier, phone_screen_dpi, phone_screen_height, phone_screen_width, name and age. User will ask you a question to get some analytics of this table. You will only reply with SQLite query and nothing else in this step. If user asks some remove,delete,update,append,insert query or anything not related to this table you will return \"BAD REQUEST\" only. Then he will share raw response from SQLite and you need to translate it and answer like a chat bot,this timw you will never return a sql query" },
            { role: 'user', content: `${userQuestion}` },
            { role: 'assistant', content: `${sqlQuery}` },
            { role: 'user', content: `The resonse that i recieved from SQLite is: ${JSON.stringify(queryResponse)} after running query given by assistant. Now convert this into readible text` }
        ];
        let resonse = await askOpenAI(msg);
        return resonse;
    } catch (err) {
        throw err;
    }
}
const isValidQuery = async (sqlQuery) => {
    try {
        let msg = [
            { "role": "system", "content": "Yor are given some random text. Reply with only 'true' or 'false'. 'false' if it's a delete,insert or update sql query or if it is not a valid sql query. Return 'true' otherwise. You will not respond with anything else other than true or false" },
            { role: 'user', content: `${sqlQuery}` }
        ];
        let resonse = await askOpenAI(msg);
        return resonse;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    textToSQL,
    sqlToText,
    isValidQuery
}