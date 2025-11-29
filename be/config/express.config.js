
const express = require("express");
const cors = require("cors");

const router = require("../src/routes/index.route");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.json({ status: "OK", service: "SharedChat Backend" });
});

// routes
app.use("/v1", router);

module.exports = {
  app
};




// const express = require("express");
// const app = express();
// const cors = require("cors")
// const bodyParser = require("body-parser")

// const router = require("../src/routes/index.route")

// app.use(cors())
// app.use(bodyParser.json())
// app.use('/v1', router)

// module.exports = {
//     app: app
// }