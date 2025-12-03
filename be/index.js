
require('dotenv').config()
const { app } = require("./config/express.config");
// const { port } = require("./config/config")[process.env.NODE_ENV]
const userRoutes = require("./src/routes/user.route");
const pushRoutes = require("./src/routes/push.routes");
const messageRoutes = require("./src/routes/message.route");
const express = require('express');
app.use(express.json());

app.get("/", (req, res) => {
    console.log("in base url");
    res.send({
        status: true,
        message: "Auto Complete Server By Amantya Technologies .Inc"
    })
});




app.use("/api", userRoutes);
app.use('/api/push', pushRoutes);
app.use('/api', messageRoutes);



// app.listen(
//     4000, "0,0,0,0", () => {
//         console.log("server running on 4000");
//     })

    app.listen(
    4000,  () => {
        console.log("server running on 4000");
    })

