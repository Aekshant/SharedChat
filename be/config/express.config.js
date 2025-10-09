
const express = require("express");
const app = express();
const cors = require("cors")
const bodyParser = require("body-parser")

const router = require("../src/routes/index.route")

app.use(cors())
app.use(bodyParser.json())
app.use('/v1', router)

module.exports = {
    app: app
}