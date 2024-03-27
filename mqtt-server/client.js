import mqtt from 'mqtt'
const client = mqtt.connect("mqtt://192.168.187.74",{
    port:1883,
    username:"king",
    password:"123456789",
    clientId:"client",
})


client.on('connect', pkt => {
    console.log("connect successfully!!!");
    // client.publish("attributes/post/温度",'32', {retain:true});
    client.publish("attributes/post/test",'32', {retain:true});
    // client.subscribe("attributes/post/test")


})


// 客户端接收消息
client.on('message', (topic, message) => {
  console.log('Received message:', message.toString());
});


