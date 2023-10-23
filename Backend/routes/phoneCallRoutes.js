const express = require('express');
const router = express.Router();
const VoiceResponse = require("twilio").twiml.VoiceResponse;

router.post('/voice', (req,res) => {
    const twiml = new VoiceResponse();
    twiml.say('Hello from Twilio. Have fun!')

    res.type('text/xml');
    res.send(twiml.toString());
})