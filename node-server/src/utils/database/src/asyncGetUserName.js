import pool from "../../../private/mysql.js";

const sql = "select user_name from user where user_email = ?";


const asyncGetUserName = async function (userEmail) {
    const [res] = await pool.promise().query(sql,[userEmail]);

    return res[0].user_name
}

export default asyncGetUserName