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


exports.registerUser = async () => {
    const { firstname, lastname, countrycode, mobileno, emailid, password } = userDetails;
    const query = `INSERT INTO public.user_master(
	    firstname, lastname, countrycode, mobileno, emailid, password)
	    VALUES ( $1, $2, $3, $4, $5, $6);`
    const params = [firstname, lastname, countrycode, mobileno, emailid, password];

    const existUser = await this.searchUserByName(firstname, lastname);
    if (existUser.length > 0) {
        return { message: "user already exist" };
    }


    try {
        const queryResult = await dbConnection.executeQuery(query, params);
        if (queryResult.rowCount == 1) {
            return { message: 'User registered Successful' }
        }
        return queryResult;
    } catch (error) {
        console.error("error in registration query", error);
        return;
    }
}

exports.loginUser = async (loginDetails) => {
    const { emailid, password } = loginDetails;
    const query = `select * from public.user_master where emailid = $1 and password = $2`

    const params = [emailid, password];
    try {
        const queryResult = await dbConnection.executeQuery(query, params);
        return queryResult;
    }
    catch (error) {
        console.error("error in login query", error);
        return [];
    }
}