const express = require('express');
const router = express.Router();
const pushController = require('../controllers/push.controller');

router.post('/save-subscription', pushController.saveSubscription);
router.post('/send', pushController.sendNotification);

module.exports = router;
