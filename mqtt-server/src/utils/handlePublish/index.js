import attrPost from "./src/attrPost.js";
import attrGet from "./src/attrGet.js";
import evtPost from "./src/evtPost.js";
import evtGet from "./src/evtGet.js";
import cmdPost from "./src/cmdPost.js";
import cmdGet from "./src/cmdGet.js";


export default function (packet, client) {
      // console.log(packet);
    // console.log(packet.payload.toString())

    if (packet.cmd !== 'publish') return

    const opts = packet.topic.split("/");

    if (opts[1] === 'attributes') {
        if (opts[2] === 'post') {
            attrPost.call(this, packet, client, opts[3]);
        } else if (opts[2] === 'get') {
            attrGet.call(this, packet, client, opts[3]);
        }
    } else if (opts[1] === 'event') {
        if (opts[2] === 'post') {
            evtPost.call(this, packet, client, opts[3]);
        } else if (opts[2] === 'get') {
            evtGet.call(this, packet, client, opts[3]);
        }
    } else if (opts[1] === 'command') {
        if (opts[2] === 'post') {
            cmdPost.call(this, packet, client, opts[3]);
        } else if (opts[2] === 'get') {
            cmdGet.call(this, packet, client, opts[3]);
        }
    }

}


