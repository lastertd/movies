import pool from "../../../private/mysql.js";

const sql = "select `index`.`key` from `index` where `index`.user_name = ?";


const asyncGetAttributeList = async function (username){
    const [res] = await pool.promise().query(sql,[username]);

    return res;
}

export default asyncGetAttributeList