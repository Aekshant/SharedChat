const { dbConnection } = require("../db/dbconnection");



exports.getChatHistory = async (chatDetails) => {
    const {chatid, chatmassege, fromuserid, touserid, togroupid, isseen, chatdate, entrytime, updatetime} = chatDetails;
       const query = `SELECT * FROM public.users_chat 
       WHERE (fromuserid = $1 and touserid = $2) or (fromuserid = $2 and touserid = $1);`
       const params = [ fromuserid , touserid ];
       try {
           const queryResult = await dbConnection.executeQuery(query, params);
           return queryResult;
       } catch (error) {
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

 