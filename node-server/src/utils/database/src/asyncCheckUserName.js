import pool from "../../../private/mysql.js";

const sql = "select count(*) as res from user where user_name = ?";

const asyncCheckUserName = async function (userName){
    const [res] = await pool.promise().query(sql,[userName]);

    if (res[0]['res'] === 0) {
        return 0;
    }
    return -1;
}

export default asyncCheckUserName