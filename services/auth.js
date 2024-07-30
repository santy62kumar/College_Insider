const jwt = require("jsonwebtoken");
require('dotenv').config();

const secret = process.env.JSON_SECRET;

function setUser(user){
    const option = { expiresIn: "10d" };

    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    }, secret, option);
}

function getUser(token){
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

module.exports={
    setUser,
    getUser
};