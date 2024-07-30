const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { setUser } = require('../services/auth');


async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    const avatar = "abc"; //choose a random avator from a list

    if(!name || !email || !password) {
        return res.status(400).json({
            status: 'fail',
            message: 'Important field missing!'
        });
    }

    if(User.findOne({ email })){
        return res.status(400).json({
            status: 'fail',
            message: 'Email Already Exists!'
        });
    }

    const newUser = await User.create({
        name,
        email,
        password,
        avatar,
    });

    const token = setUser(newUser);
    res.cookie("token", token);

    // return res.redirect("/");
    return res.status(200).json({
        status: 'success',
        message: 'Signup Successful!'
    });
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing Email or Password'
        });
    }

    // const user = await User.findOne({ email, password });
    // if (!user) return res.render("login", {
    //     error: "Invalid Username or Password",
    // });

    const user = await User.findOne({ email }).select('+password')


    if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(401).json({
            status: 'unauthorized!',
            message: 'Incorrect Email or Password'
        });
    }


    const token = setUser(user);
    res.cookie("token", token);

    //instead of redirecting to home page, move to last page or homepage
    // return res.redirect("/");
    return res.status(200).json({
        status: 'success',
        message: 'Login Successful!'
    });
}

module.exports = {
    handleUserSignup,
    handleUserLogin
};