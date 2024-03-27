import pool from "../../../private/mysql.js";

const sql = "select value,create_time from attribute where user_name = ? and `key` = ? ORDER BY create_time DESC LIMIT 100";

const asyncGetAttributes = async function (username, attribute){
    const [res] = await pool.promise().query(sql,[username, attribute]);
    return res;
}

export default asyncGetAttributes