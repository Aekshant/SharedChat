
require('dotenv').config()
const { app } = require("./config/express.config");
// const { port } = require("./config/config")[process.env.NODE_ENV]
const userRoutes = require("./src/routes/user.route");


app.get("/",(req,res)=>{    
    res.send({
        status:true,
        message: "Auto Complete Server By Amantya Technologies .Inc"
    })
})

app.use("/api", userRoutes);

app.listen( 
    4000,()=>{
    console.log("server running on 4000");
})