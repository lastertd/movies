import mqtt from 'mqtt'

const client = mqtt.connect("mqtt://192.168.187.74", {
    port: 1883,
    username: "king",
    password: "123456789",
    clientId: "end"
})


client.on('connect', pkt => {
    console.log("connect successfully!!!");
    client.publish("attributes/get/test",'12');

})


// 客户端接收消息
client.on('message', (topic, message) => {
    console.log(topic)
    console.log('Received message:', message.toString());
});


