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


exports.getUserById = async (userid) => {
    const query = `select * from public.user_master where userid = $1`
    const params = [userid];

    try {
        const queryResult = await dbConnection.executeQuery(query, params);
        return queryResult;
    } catch (error) {
        console.error("error in login query", error);
        return [];
    }
}


exports.registerUser = async (userDetails) => {
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

exports.updateUser = async (userDetails) => {
    const {
        userid,
        firstname,
        lastname,
        countrycode,
        mobileno,
        emailid,
        gender
    } = userDetails;

    const query = `
        UPDATE public.user_master
        SET firstname = $1,
            lastname = $2,
            countrycode = $3,
            mobileno = $4,
            emailid = $5,
            gender = $6,
            updatetime = NOW()
        WHERE userid = $7
        RETURNING *;
    `;

    // Correct params as per query order
    const params = [
        firstname,
        lastname,
        countrycode,
        mobileno,
        emailid,
        gender,
        userid
    ];

    try {
        const queryResult = await dbConnection.executeWriteQuery(query, params);
        console.log("Update Query Result:", queryResult);
        if (queryResult.rowCount === 1) {
            return { message: 'User updated successfully' };
        }

        return { message: 'No user updated' };

    } catch (error) {
        console.error("Error updating user", error);
        return { message: 'Error updating user' };
    }
}


exports.updateProfilePicture = async (userid, profilePicturePath) => {
    const query = `
       UPDATE public.user_master SET profileurl = $1, updatetime = NOW() WHERE userid = $2;`;
    const params = [profilePicturePath, userid];
    try {
        const queryResult = await dbConnection.executeWriteQuery(query, params);

        if (queryResult.rowCount === 1) {
            return { message: 'Profile picture updated successfully' };
        }
        return { message: 'No user updated' };

    }
    catch (error) {
        console.error("Error updating profile picture", error);
        return { message: 'Error updating profile picture' };
    }
}
