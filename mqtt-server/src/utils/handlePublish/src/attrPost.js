import limiter from "./limiter.js";

export default function (packet, client, key) {
    const value = packet.payload.toString();
    const username = client._parser.settings.username;


    if (limiter.allow(username, client.id, key)) {
        limiter.add(username, client.id, key);

        //添加到数据库
        client.database.pushAttr(key, value)
            .catch(e => {
                console.log(`ERROR: ${e.message}`)

            })

        //log
        console.log(`${username}-${client.id}推送了一条数据: ${key}: ${value}`);

    } else {
        //log
        console.log(`${username}-${client.id}推送的${key}正在冷却中......`)
    }
}

