import pool from "../../../private/mysql.js";


const sql = "insert into user(user_email, user_name, user_password) value (?,?,?)";

const asyncRegister = async function (fields){
    const {userEmail, userName, userPassword} = fields;

    const res = await pool.promise().query(sql,[userEmail, userName, userPassword]);

    return 0
}


export default asyncRegister