const express = require("express");
const router = express.Router();
const { searchCollege } = require("../handlers/searchApi");
const { sendEmailOtp } = require("../handlers/emailApi");
const { adminApiAddCollege, adminApiInviteAmbassdor } = require("../handlers/adminApi");
const { restrictTo, restrictToLoggedinUserOnly } = require("../middlewares/auth");
const { verifyEmailOtp } = require("../middlewares/verify");
const { handleUserSignup } = require("../handlers/user");

router.get("/search/college/:term", searchCollege);

router.post("/email/otp/send", sendEmailOtp);
// router.post("/email/otp/verify", verifyEmailOtp);

router.post("/email/url/send", (req, res) => {});
//this link is the redirected one and it will then set user and redirect to home page
router.post("/email/url/validate", (req, res) => {});


router.post("/admin/addCollege", restrictToLoggedinUserOnly, restrictTo(['ADMIN']), adminApiAddCollege);
router.post("/admin/inviteAmbassdor", restrictToLoggedinUserOnly, restrictTo(['ADMIN']), adminApiInviteAmbassdor);


router.post("/signup/verify", verifyEmailOtp, handleUserSignup);

module.exports = router;