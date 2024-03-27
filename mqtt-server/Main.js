import aedes from 'aedes';
import net from 'net';
import * as oS from "os";
import http from 'http';
import ws from "websocket-stream"

import handleConnect from "./src/utils/handleConnect.js";
import handleDisconnect from "./src/utils/handleDisconnect.js";
import handlePublish from "./src/utils/handlePublish/index.js"
import handleSubcribe from "./src/utils/handleSubcribe.js";
import authenticate from "./src/utils/authenticate.js";
import authorizePublish from "./src/utils/authorizePublish.js";
import authorizeSubscribe from "./src/utils/authorizeSubscribe.js";

const broker = new aedes({
    connectTimeout: 5000
});


broker.authenticate = authenticate;

broker.authorizePublish = authorizePublish;

broker.authorizeSubscribe = authorizeSubscribe;

broker.on('client', handleConnect);

broker.on('clientDisconnect', handleDisconnect);

broker.on('publish', handlePublish);

broker.on('subscribe', handleSubcribe);



net.createServer((socket) => {
    broker.handle(socket);
}).listen(1883, '0.0.0.0', () => {
    console.log(`MQTT server running at: ${oS.networkInterfaces()['WLAN'][3].address}:1883`)
});

const httpServer = http.createServer();

httpServer.listen(1884, '0.0.0.0', () => {
    console.log(`http server running at: ${oS.networkInterfaces()['WLAN'][3].address}:1884`)
});

ws.createServer({server: httpServer}, broker.handle);







