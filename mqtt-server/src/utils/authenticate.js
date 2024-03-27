import pool from "./private/mysql.js";

const rejectList = new Set();


export default function (client, username, password, done){
  if (rejectList.has(client.id)){
    done(null, false);
    return
  }
   pool.promise().query("select * from user where user_name = ? and user_password = ?",[username,password.toString()])
      .then(([row, fi]) => {
        if (row[0]) done(null, true);
        else {
          done(null, false);
          rejectList.add(client.id);
          setInterval(() => {
            rejectList.delete(client.id);
          },5000);
        }
      })
}