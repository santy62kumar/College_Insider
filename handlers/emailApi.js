const { generateRandomOtp } = require("../utils/utils");
const redis = require("../services/redisCache");
const { sendMail } = require("../services/nodeMailer");

async function sendEmailOtp(req, res) {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ message: "Email Missing!" });
        return;
    }

    try {
        const randomOtp = generateRandomOtp();
        redis.set(`${email} otp`, `${randomOtp} ${(new Date().getTime()) + (5 * 60 * 1000)}`);

        mailText = `This OTP for email signup is valid for 5 minutes.\n OTP: ${randomOtp}`;
        const response = sendMail([email], "OTP to verify email signup on College Insider.", mailText);
        if(!response){
            console.log("Error in sending otp mail to the email");
            return res.status(500).json({ message : "Unable to send mail." });
        }
    }
    catch (err) {
        console.log("Error in otp generation: ", err);
        res.status(500).json({ message: "Error in generating otp." });
        return;
    }

    res.json({ message: "success" });
}


module.exports = {
    sendEmailOtp,
};