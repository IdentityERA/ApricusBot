const dialogFlow = require("dialogflow");
const config = require("../keys");

// session client
const sessionClient = new dialogFlow.SessionsClient({
  keyFilename: "D:/React.js/reactBot/Backend/key/reactpageagent-rvfh-cb52ae962194.json"
});
const sessionPath = sessionClient.sessionPath(
  config.googleProectId,
  config.dialogFlowSessionId
);

const dfTextQuery = async (req, res) => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: req.body.text,
        userId: req.body.userId,
        languageCode: config.dialogFlowSessionLaguageCode,
      },
    },
  };
  let responses = await sessionClient.detectIntent(request);
  res.send(responses[0].queryResult);
};

const dfEventQuery = async (req, res) => {
  const request = {
    session: sessionPath,
    queryInput: {
      event: {
        name: req.body.event,
        userId: req.body.userId,
        languageCode: config.dialogFlowSessionLaguageCode,
      },
    },
  };
  let responses = await sessionClient.detectIntent(request);
  res.send(responses[0].queryResult);
};

exports.dfTextQuery = dfTextQuery;
exports.dfEventQuery = dfEventQuery;
