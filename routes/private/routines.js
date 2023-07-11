const express = require('express');
const router = express.Router();
const apiHelper = require('../../helpers/apiHelpers')
const repoInstance = require('../../repository');
router.post("/bulkSlackReminder",
    async (req, res) => {
        try {
            if (req.body.channels.length === 0) return res.status(200).send("Health Check Good");
            let allTokens = await Promise.allSettled(req.body.channels.map(entry => {
                return repoInstance.getAccessToken(entry);
            }));
            for (let i = 0; i < req.body.channels.length; i++){
                allTokens[i] = [req.body.channels[i], allTokens[i].value];
            }
            let response = await Promise.allSettled(allTokens.map(entry => {
                return entry[1] ? apiHelper.sendSlackMessage(entry[1], entry[0], null, 'Hey, would you guys like to use my super natural abilities and ask some crazy queations?')
                    : undefined;
            }).filter(Boolean));
            res.status(200).send(response);
        } catch (err) {
            
        }
     });
module.exports = router;