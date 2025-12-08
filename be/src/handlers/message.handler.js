
const messageService = require("../services/message.service")

exports.getChatHistory = async (req, res) => {
    try {
        const data = await messageService.getChatHistory(req.body);
        return res.status(200).send({ status: true, data, message: "success" })
    } catch (error) {
        return res.status(200).send({ status: true, data:'unable to fetch message', message: "Internal Server Issue", error })
    }
}

exports.insertMessage = async (req, res) => {
    try {
        const data = await messageService.insertMessage(req.body);
        return res.status(200).send({ status: true, data, message: "success" })
    } catch (error) {
        return res.status(200).send({ status: true, data : 'data', message: "Internal Server Issue", error })
    }
}

