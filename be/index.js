
require('dotenv').config()
const { app } = require("./config/express.config");
const { port } = require("./config/config")[process.env.NODE_ENV]


app.get("/",(req,res)=>{    
    res.send({
        status:true,
        message: "Auto Complete Server By Amantya Technologies .Inc"
    })
})


app.listen( port,()=>{
    console.log("server running on "+ port);
})