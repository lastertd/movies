import express from "express";
import handleError from "../utils/middleware/handleError.js";
import handleLog from "../utils/middleware/handleLog.js";
import cookieParser from "cookie-parser";
import key from "../private/key.js";


import mqttRoute from "./src/mqttRoute.js";
import cors from "cors";
import oS from "os";

const router = express.Router()
router.use(handleLog)
router.use(cookieParser(key.cookieKey))    //用于简化cookie操作，详见: https://github.com/expressjs/cookie-parser#readme


if (process.argv[2] === 'dev') {        //开发环境
    router.use(cors({
        origin: "http://192.168.97.74:8080",
        credentials: true,
    }))                                     //跨域只能放在router不能放在app上面，我也不知道为什么(
}


router.use(mqttRoute)


router.use(handleError)


export default router