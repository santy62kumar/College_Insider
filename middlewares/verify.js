const redis = require("../services/redisCache");


async function verifyEmailOtp(req, res, next) {
    const { email, otp } = req.body;

    if (!email || !otp) {
        res.status(400).json({ message: "Important field missing!" });
        return;
    }

    try {
        const rsp = await redis.get(`${email} otp`);
        
        if(!rsp) {
            return res.status(400).json({ message : "Invalid request!"});
        }

        const arr = rsp.split(' ');
        if(otp === parseInt(arr[0]) && (+arr[1]) >= (new Date().getTime())){
            next();
        }
        else {
            return res.status(401).json({ message : "OTP mismatch!"});
        }
    }
    catch(err) {
        console.log("Error in verifying otp: ", err);
        return res.status(500).json({ message : "Error in verifying otp."});
    }
}


module.exports = {
    verifyEmailOtp,
};