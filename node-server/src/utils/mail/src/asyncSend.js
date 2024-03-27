import {transport} from "../../../private/sendEmail.js";

const asyncSend = async function (receiver, content){
   return await transport.sendMail({
       from:'"Three-SSS" <lasterxin@163.com>',
       to:receiver.toString(),
       subject:"非常好的邮件，来自CHINA",
       text:content
   })
}

export default asyncSend