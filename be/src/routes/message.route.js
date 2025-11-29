
const router = require("express").Router()
const messageHandler = require("../handlers/message.handler")

router.post("/message/insertmessage", messageHandler.insertMessage);
module.exports = router