export default function (client, subscription, callback) {
  const username = client?._parser?.settings?.username
  subscription.topic = `${username}/${subscription.topic}`
  console.log(`${client.id}订阅了一个topic: ${subscription.topic}`)
  callback(null,subscription);
}