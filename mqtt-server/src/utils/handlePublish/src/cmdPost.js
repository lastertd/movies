import limiter from "./limiter.js";

export default function (packet, client, cmd) {
    const username = client._parser.settings.username;
    if (limiter.allow(username, client.id, cmd)) {
        limiter.add(username, client.id, cmd,5000);
        //log
        console.log(`${username}-${client.id}推送了一条指令: ${cmd}`);
    }else {
        //log
        console.log(`${username}-${client.id}推送的指令: ${cmd}, 正在冷却中......`)
    }
}
