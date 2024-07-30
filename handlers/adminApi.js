const College = require("../models/college");
const { sendMail } = require("../services/nodeMailer");
const { htmlInvitation } = require("../constants/constants");
const { generateEmailUrl, verifyEmailUrl } = require("../utils/utils");
const redis = require("../services/redisCache");

async function adminApiAddCollege(req, res) {
    const { name } = req.body;

    if(name == ""){
        res.status(400).json({ message: "Important Field Missing!"});
        return;
    }

    try {
        await College.create({

        });
    }
    catch(err) {
        console.log("Error in adding college: ", err);
        res.status(500).json({ message: "Error in adding college"});
    }

    res.json({ message : "success"});
} 


async function adminApiInviteAmbassdor(req, res) {
    //when signing up a user when if they have been already invited
    const { email, college } = req.body;

    if(!email || !college){
        res.status(500).json({ message : "Important field missing!"});
        return;
    }

    //create a email link and upon acceptance save it to the db
    const randNum = (Math.random() * 1000000);
    invitationUrl = generateEmailUrl({ email, data : randNum });

    redis.set(`${email} url`, `${randNum}`);

    mailHtml = htmlInvitation.replace('{invitationUrl}', invitationUrl);;

    const respone = await sendMail([email], `Invitation to join as ambassdor of ${college} on our portal College Insider`, "", mailHtml);

    if(!response){
        res.status(500).json({ message : "Unable to send mail."});
        return;
    }

    res.json({ message : "success"});
}



//this is just added here move it to the handler of the ambassdor
async function verifyAmbassdorInviteUrl(req, res, next) {
    const { token } = req.params;

    const data = verifyEmailUrl(token);

    redis.get(`${data.email} url`).then((result) => {
        if(result == parseInt(data.data)){
            next();
        }
        else {
            return res.status(401).json({ message : "Invalid invitation url!"});
        }
    }).catch(err => {
        console.log("Error in verifying the url invitation: ", err);
        return res.status(500).json({ message : "Error in verifying the url invitation."});
    });
}

module.exports = {
    adminApiAddCollege,
    adminApiInviteAmbassdor,
};