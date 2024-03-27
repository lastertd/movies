import express, {json} from "express";
import asyncFromParser from "../../utils/processor/asyncFromParser.js";
import database from "../../utils/database/index.js";
import handleAuthorize from "../../utils/middleware/handleAuthorize.js";
import mail from "../../utils/mail/index.js";


const mqttRoute = express.Router();


mqttRoute.post("/login", async (req, res, next) => {
    try {
        const [fields] = await asyncFromParser(req);
        const status = await database.asyncLogin(fields);


        if (status === -1) {
            res.json({status: status, message: "账户未注册，请先注册账户"})
        } else if (status === -2) {
            res.json({status: status, message: "账户密码不一致"})
        } else if (status === 0) {
            const {userEmail} = fields;
            const userName = await database.asyncGetUserName(userEmail);

            res.cookie('t', userEmail, {
                maxAge: 1000 * 60 * 60 * 24,
                signed: true
            })
            res.cookie('n',userName,{
                maxAge: 1000 * 60 * 60 * 24,
                signed: true
            })


            res.json({status, message: "login successfully",userName})
        }

    } catch (e) {
        next(e);
    }

})

mqttRoute.get("/checkEmail/:email", async (req, res, next) => {
    const {email} = req.params;

    const status = await database.asyncCheckEmail(email);

    if (status === 0) {
        res.send({
            status,
            message: 'ok'
        })
    } else {
        res.send({
            status,
            message: "该邮箱已被注册"
        })
    }
})

mqttRoute.get("/checkUserName/:userName", async (req, res, next) => {
    const {userName} = req.params;

    const status = await database.asyncCheckUserName(userName);

    if (status === 0) {
        res.send({
            status,
            message: 'ok'
        })
    } else {
        res.send({
            status,
            message: "该用户名已存在"
        })
    }
})


mqttRoute.post("/register", async (req, res, next) => {
    try {
        const [fields] = await asyncFromParser(req);
        const status = await database.asyncRegister(fields);

        const {userEmail} = fields;
        mail.asyncSend(userEmail, `
            这是测试邮件
            1
            2
            3
            
            
        `).then().catch(e =>next(e));


        res.send({
            status,
            message:"ok"
        })

    } catch (e) {
        next(e);
    }
})


mqttRoute.post("/authorize", async (req, res, next) => {
    try {
        const {t} = req.signedCookies;
        const status = await database.asyncAuthorize(t);

        if (status === 0) {
            res.json({status: status, message: "ok"});
        } else {
            res.json({status: status, message: "err"});
        }

    } catch (e) {
        next(e);
    }
})

mqttRoute.get("/attributeList", handleAuthorize, async (req, res, next) => {
    try {
        const {n} = req.signedCookies;

        const data = await database.asyncGetAttributeList(n);

        res.send({
            status: 0,
            message: "ok",
            data: data
        })


    } catch (e) {
        next(e);
    }
})

mqttRoute.get("/attribute/:attribute", handleAuthorize, async (req, res, next) => {
    try {
        const {n} = req.signedCookies;
        const {attribute} = req.params;


        const data = await database.asyncGetAttribute(n, attribute);

        res.send({
            status: 0,
            message: "ok",
            data: data
        })

    } catch (e) {
        next(e);
    }
})

mqttRoute.get("/attributes/:attribute", handleAuthorize, async (req, res, next) => {
    try {
        const {n} = req.signedCookies;
        const {attribute} = req.params;


        const data = await database.asyncGetAttributes(n, attribute);


        res.send({
            status: 0,
            message: "ok",
            data: data
        })

    } catch (e) {
        next(e);
    }
})


export default mqttRoute