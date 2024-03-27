export default function (client) {
      console.log(`设备: ${client?.id}失去连接......`)
      client.database = null;
}