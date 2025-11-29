
const userServices = require("../services/user.service")
const messageService = require("../services/message.service")

exports.getData = async (req, res) => {
    try {
        const data = await userServices.getData()
        return res.status(200).send({ status: true, data, message: "success" })
    } catch (error) {
        return res.status(200).send({ status: true, data, message: "Internal Server Issue", error })
    }

}

exports.insertMessage = async (req, res) => {
    try {
        const data = await messageService.insertMessage(req.body);
        console.log("data in handler" , data)
        return res.status(200).send({ status: true, data, message: "success" })
    } catch (error) {
        console.log(error)
        return res.status(200).send({ status: true, data : 'data', message: "Internal Server Issue", error })
    }

}