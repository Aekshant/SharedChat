const { dbConnection } = require("../db/dbconnection");



exports.getData = async () => {
    const query = `select * from public.user_master`
    const params = [];

    try {
        const queryResult = await dbConnection.executeQuery(query, params);
        return queryResult;
    } catch (error) {
        console.error("error in login query", error);
        return [];
    }
}


exports.insertMessage = async (chatDetails) => {
    const { chatid, chatmassege, fromuserid, touserid, togroupid, isseen, chatdate, entrytime, updatetime } = chatDetails;
    const query = `INSERT INTO public.users_chat(
	    chatmassege , fromuserid , touserid)
	    VALUES ( $1, $2, $3);`
    const params = [chatmassege, fromuserid, touserid];
    try {
        const queryResult = await dbConnection.executeWriteQuery(query, params);
        // if (queryResult.rowCount == 1) {
        return { message: 'Message Send Successfully' }
        // }
        // return queryResult;
    } catch (error) {
        console.error("Error In Sending Message", error);
        return { message: "Unable To Deliver Message" };
    }

}

 