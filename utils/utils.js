const jwt = require("jsonwebtoken");
require('dotenv').config();


function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function checkPasswordStrength(password) {
    // Define the regular expressions for each requirement
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    // Initialize the strength score
    let strength = 0;

    // Check password length
    if (password.length >= 8 && password.length <= 15) {
        strength++;
    } else {
        return [false, strength, "Password must be between 8 and 15 characters long."];
    }

    // Check for at least one uppercase letter
    if (uppercaseRegex.test(password)) {
        strength++;
    } else {
        return [false, strength, "Password must contain at least one uppercase letter."];
    }

    // Check for at least one lowercase letter
    if (lowercaseRegex.test(password)) {
        strength++;
    } else {
        return [false, strength, "Password must contain at least one lowercase letter."];
    }

    // Check for at least one number
    if (numberRegex.test(password)) {
        strength++;
    } else {
        return [false, strength, "Password must contain at least one number."];
    }

    // Check for at least one special character
    if (specialCharRegex.test(password)) {
        strength++;
    } else {
        return [false, strength, "Password must contain at least one special character."];
    }

    // Determine the password strength based on the score
    if (strength === 5) {
        return [true, strength, "Strong password"];
    } else if (strength === 4) {
        return [true, strength, "Moderately strong password"];
    } else {
        return [true, strength, "Weak password"];
    }
}


function generateRandomOtp(digits = 6) {
    if(digits < 0) return 0;

    let low = Math.pow(10, digits - 1);
    let high = low*10 - 1;
    
    return (Math.floor(Math.random() * (high - low + 1)) + low);
}


function generateEmailUrl(data) {
    const option = { expiresIn: "10d" };

    return jwt.sign({
        email: data.email,
        data: data.data,
    }, process.env.JSON_SECRET, option);
}

function verifyEmailUrl(token) {
    try {
        return jwt.verify(token, process.env.JSON_SECRET);
    } catch (error) {
        return null;
    }
}

module.exports = {
    isValidEmail,
    checkPasswordStrength,
    generateRandomOtp,
    generateEmailUrl,
    verifyEmailUrl,
};