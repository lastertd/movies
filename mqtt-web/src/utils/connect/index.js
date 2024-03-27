import mqtt from 'mqtt/dist/mqtt'

const client = mqtt.connect("ws://192.168.187.74",{
    port:1884,
    username:"bful3auk9on771vy",
    password:"wsSMEHN6ls11",
    clientId:"browser client",

})


client.on('connect', () => {
    console.log("connect successfully!!!");
    client.subscribe("attributes");

})


// 客户端接收消息
client.on('message', (topic, message) => {
  console.log('Received message:', message.toString());
});
