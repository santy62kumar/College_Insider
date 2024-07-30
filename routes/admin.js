const express = require("express");
const { adminAddCollege, adminApproveAmbassdor, adminInviteAmbassdor } = require("../handlers/admin");
const router = express.Router();
const { restrictToLoggedinUserOnly, restrictTo } = require("../middlewares/auth");

router.use(restrictToLoggedinUserOnly);
router.use(restrictTo(['ADMIN']));

router.get("/addCollege", adminAddCollege);
router.get("/approveAmbassdor", adminApproveAmbassdor);
router.get("/inviteAmbassdor", adminInviteAmbassdor);

module.exports = router;