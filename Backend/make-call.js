const env = require("dotenv");
env.config();
const express = require('express');
const router = express.Router();

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;


const client = require("twilio")(accountSid, authToken);

router.post('/voice', async (req,res) => {
    await client.calls.create({
        twiml: "<Response><Say>Hello!!! This is Bot. Tell me what you need!</Say></Response>",
        to: "+91 mobile number",
        from: process.env.PHONE_NUMBER,
      }).then(call =>  res.send(call.sid));
})

module.exports = router;