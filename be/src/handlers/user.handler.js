
const userServices = require("../services/user.service")

exports.getData = async (req, res) => {
    try {
        const data = await userServices.getData()
        return res.status(200).send({ status: true, data, message: "success" })
    } catch (error) {
        return res.status(200).send({ status: true, data, message: "Internal Server Issue", error })
    }
}