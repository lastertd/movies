export default function (err, req, res, next)  {
    console.log(`[${new Date()}]: An error at ${req.originalUrl}`)
    console.log("ERROR INFO: ", err.message)
    res.status(500).json({ status:-100,message: 'Internal Server Error' });
}