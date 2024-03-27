import pool from "../../../private/mysql.js";


const sql = "select count(*) as res  from user  where user_email = ?";

const asyncAuthorize = async function (userEmail) {
    const [hasCount] = await pool.promise().query(sql, [userEmail]);

    //账户未注册
    if (hasCount[0]['res'] === 0) return -1;

    return 0
}


export default asyncAuthorize