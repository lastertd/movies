import Database from "./database/index.js";

export default function (client) {
  console.log(`收到一个来自: ${client.id}的连接!!!`);
  client.database = new Database(client._parser.settings.username, client._parser.settings.password.toString())

}