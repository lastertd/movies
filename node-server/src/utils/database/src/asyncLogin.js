import pool from "../../../private/mysql.js";


const sql1 = "select count(*) as res  from user  where user_email = ?";
const sql = "select count(*) as res  from user  where user_email = ? and user_password = ?";


const asyncLogin = async function (fields) {
    const {userEmail, userPassword} = fields;
    const [hasCount] = await pool.promise().query(sql1, [userEmail]);

    //账户未注册
    if (hasCount[0]['res'] === 0) return -1;

    const [res] = await pool.promise().query(sql,[userEmail, userPassword]);

    if (res[0]["res"] === 0) return -2;

    return 0;

}



export default asyncLogin