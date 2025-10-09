
const router = require("express").Router()
const userHandler = require("../handlers/user.handler")

router.get("/userData", userHandler.getData)

module.exports = router