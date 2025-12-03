
const router = require("express").Router()
const messageHandler = require("../handlers/message.handler")

router.post("/message/insertmessage", messageHandler.insertMessage);

router.post("/message/chathistory", messageHandler.getChatHistory);
module.exports = router