const express = require('express');
const router = express.Router();
const allErrors = require('../../config/allErrors');
const { slackServiceInstance} = require('../../services');
const generalConfig = require('../../config/general-config')

router.post("/actions",
    async (req, res) => {
        try {
            res.status(200).send(); //this is done to avoid retries by slack due to response delaying by more than 3 sec
            console.log(req.body)
            if (req.body.challenge) return res.status(200).send({ challenge: req.body.challenge });
            if (req.body.token != generalConfig.mySlackToken) return res.status(401).send();
            let response;
            let { text, user, ts, team, channel } = req.body.event;
            switch (req.body.event.type) {
                case 'app_mention':                    
                    response = await slackServiceInstance.appMention(text, user, ts, team, channel);
                    break;
                case 'member_joined_channel':
                    if (req.body.event.user !== req.body.authorizations.user_id) break;
                    response = await slackServiceInstance.appMention(text, user, ts, team, channel);
                    break;
                default:
                    console.log("New tyoe of event found: ", req.body.event.type);
                    throw allErrors.unexpectedError;
            }            
            return;
        } catch (err) {            
            console.log(err);
            return;
        }
     });
router.get("/oAuth",
    async (req, res) => {
        try {
            let code = req.query.code;
            let response = await slackServiceInstance.registerOAuth(code);
            res.header('Content-Type', 'text/html').send(response);
        } catch (err) {            
            if (err instanceof allErrors.BotError) {
                res.status(400).send(err);
            } else {
                console.log(err);
                res.status(500).send(allErrors.unexpectedError);
            }
        }
    });
module.exports = router;