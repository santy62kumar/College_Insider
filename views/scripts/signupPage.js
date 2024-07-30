const detailContainer = document.getElementById("enter-detail-container");
const verfiyContainer = document.getElementById("verify-container");
const extraContainer = document.getElementById("enter-extra-container");
const sendOtpButton = document.getElementById("send-otp-btn");
const signupVerifyButton = document.getElementById("signup-verify-btn");
const extraSkipButton = document.getElementById("extra-skip-btn");
const signEmail = document.getElementById("sign-email");
const signUsername = document.getElementById("sign-username");
const signPassword = document.getElementById("sign-password");
const warningAlert = document.getElementById("warning-alert");
const errorAlert = document.getElementById("error-alert");

// const baseUrl = "127.0.0.1:3000";


let userInfo = {};

sendOtpButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const email = signEmail.value;
    const username = signUsername.value;
    const password = signPassword.value;

    if (!isValidEmail(email) || username == "" || password == "") {
        warningAlert.style.display = "block";
        document.getElementById("warning-alert-text").textContent = "Warning: Important Field Missing or Incorrect!";
        setTimeout(() => {
            warningAlert.style.display = "none";
        }, 1500);
        return;
    }

    const res = checkPasswordStrength(password);
    if (!res[0]) {
        warningAlert.style.display = "block";
        document.getElementById("warning-alert-text").textContent = "Warning: " + res[2];
        setTimeout(() => {
            warningAlert.style.display = "none";
        }, 1500);
        return;
    }

    const response = await fetchPost("/api/email/otp/send", { email, password, username });

    if (response.res) {
        detailContainer.style.display = "none";
        verfiyContainer.style.display = "flex";
        document.getElementById("signup-verify-email-text").textContent = `An OTP has been sent to verify on email: ${email}`;
        userInfo = { email, password, username };
    }
    else {
        errorAlert.style.display = "block";
        document.getElementById("error-alert-text").textContent = "Alert: " + response.msg;
        setTimeout(() => {
            errorAlert.style.display = "none";
        }, 1500);
        return;
    }
});



signupVerifyButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const otp = document.getElementById("signup-verify-otp").value;
    if (!otp) {
        warningAlert.style.display = "block";
        document.getElementById("warning-alert-text").textContent = "Warning: Important Field Missing!";
        setTimeout(() => {
            warningAlert.style.display = "none";
        }, 1500);
        return;
    }

    userInfo.otp = otp;

    const response = await fetchPost("/api/signup/verify", userInfo);
    console.log(response);

    if (response.res) {
        verfiyContainer.style.display = "none";
        extraContainer.style.display = "flex";
        console.log(response.data);
    }
    else {
        errorAlert.style.display = "block";
        document.getElementById("error-alert-text").textContent = "Alert: " + response.msg;
        setTimeout(() => {
            errorAlert.style.display = "none";
        }, 1500);
        return;
    }
});


extraSkipButton.addEventListener('click', (e) => {
    e.preventDefault();

    //moving to the last opened page
    const referrer = document.referrer;

    // Check if there is a referrer
    if (referrer) {
        // Redirect to the last page
        window.location.href = referrer;
    } else {
        // Redirect to the homepage
        window.location.href = '/';
    }
});



async function fetchPost(url, data) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Set content type to JSON
        },
        body: JSON.stringify(data) // Convert JSON data to a string and set it as the request body
    };

    // Make the fetch request with the provided options
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            // throw new Error('Network response was not ok');
            return { res: false, msg: data.message };
        }

        return { res: true, data: data };
    }
    catch(error) {
        // Handle any errors that occurred during the fetch
        console.error('Fetch error:', error);
        return { res: false, msg: "Fetch error" };
    }
}