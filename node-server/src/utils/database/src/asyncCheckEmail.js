import pool from "../../../private/mysql.js";

const sql = "select count(*) as res from user where user_email = ?";

const asyncCheckEmail = async function (email){
    const [res] = await pool.promise().query(sql,[email]);

    if (res[0]['res'] === 0) {
        return 0;
    }
    return -1;
}

export default asyncCheckEmail