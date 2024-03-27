

const handleCor = function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin","http://192.168.213.74:8080");
    next();

}


export default handleCor