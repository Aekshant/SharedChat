
const userServices = require("../services/user.service")

exports.getData = async (req, res) => {
    try {
        const data = await userServices.getData()
        return res.status(200).send({ status: true, data, message: "success" })
    } catch (error) {
        return res.status(200).send({ status: true, data, message: "Internal Server Issue", error })
    }
}


exports.registerUser = async (req, res) => {
    try {
        const data = await userServices.getData()
        return res.status(200).send({ status: true, data, message: "success" })
    } catch (error) {
        return res.status(200).send({ status: true, data, message: "Internal Server Issue", error })
    }
}


exports.loginUser = async (req, res) => {
    console.log(req.body)
    try {
        const data = await userServices.loginUser(req.body);
        console.log(data)
        if (data.length == 0) {
            return res.status(401).send({ status: false, data, message: "Invalid Credentials" })
        }
        return res.status(200).send({ status: true, data, message: "success" })
    } catch (error) {
        return res.status(200).send({ status: true, data, message: "Internal Server Issue", error })
    }
}