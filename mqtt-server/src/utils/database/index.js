import pool from "../private/mysql.js";

class Database {
    constructor(username, userpassword) {
        this.username = username;
        this.userpassword = userpassword;
    }

    async getKeys() {
        const row = await pool.promise().query("select * from `index` where user_name = ?", [this.username])
        return row[0];
    }

    async getLatestValue(key) {
        const row = await pool.promise().query("SELECT * FROM attribute WHERE user_name = ? AND `key` = ? ORDER BY create_time DESC LIMIT 1", [this.username, key])
        return row[0][0];
    }

    async getAllValue(key) {
        const row = await pool.promise().query("SELECT * FROM attribute WHERE user_name = ? AND `key` = ? ORDER BY create_time DESC", [this.username, key])
        return row[0];
    }

    async pushAttr(key, value) {
        const [res, filed] = await pool.promise().query("insert into attribute(user_name, `key`, value) VALUE (?, ?, ?)", [this.username, key, value]);
        return res
    }


}

export default Database
