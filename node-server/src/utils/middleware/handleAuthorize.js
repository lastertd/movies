const handleAuthorize = function (req, res, next) {
    const {t} = req.signedCookies;

    if (t === undefined) {
        res.status(403).json({status: -1, message: "你没有使用该接口的权限"});
        return
    }

    next();
}

export default handleAuthorize