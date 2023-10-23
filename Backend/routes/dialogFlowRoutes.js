const express = require('express');
const router = express.Router();
const dialogFlowController = require('../controller/dialogFlowController');

router.post('/df_text_query', dialogFlowController.dfTextQuery);
router.post('/df_event_query', dialogFlowController.dfEventQuery);

module.exports = router;