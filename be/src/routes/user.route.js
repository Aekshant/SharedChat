
const router = require("express").Router()
const userHandler = require("../handlers/user.handler")

router.get("/chat/users", userHandler.getData);

router.post("/chat/register", userHandler.registerUser);

router.post("/auth/login", userHandler.loginUser);

module.exports = router