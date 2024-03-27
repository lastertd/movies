export default function (client, packet, callback){
  const username = client?._parser?.settings?.username
  packet.topic = `${username}/${packet.topic}`
  callback(null);
}