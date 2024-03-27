export default async function (packet, client, key) {
    const username = client._parser.settings.username;
    const data = await client.database.getLatestValue(key);

    //log
    console.log("-------------------------------------------------")
    console.log(`${username}用户下的[ ${client.id} ]请求获取属性: ${key}`);
    console.log("回复值为: ", data.value);
    console.log("-------------------------------------------------\n")



    //发布 attributes/response/*
    this.publish({
        cmd: "publish",
        topic: `${username}/attributes/response/${key}`,
        payload: Buffer.from(data.value),
        retain: true,
    }, () => {
    })
}