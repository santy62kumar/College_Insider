const College  = require("../models/college");
const nodeCache = require("../services/nodeCache");

const { StateList } = require("../constants/constants");

async function adminAddCollege(req, res) {
    const data = {
        stateList: StateList,
    };

    res.render("./views/admin/addCollege", data);
}


async function adminApproveAmbassdor(req, res) {
    res.render("./views/admin/approveAmbassdor");
}


async function adminInviteAmbassdor(req, res) {
    const data = {
        collegeList: await getCollegeList(),
    };

    res.render("./views/admin/inviteAmbassdor", data);
}


async function getCollegeList() {
    //fist check in the cache and if it is not present then fetch from mongodb
    //whenever new college is added revalidate the cache

    if(nodeCache.has("collegeList")){
        return nodeCache.get("collegeList");
    }

    try {
        const collegeList = await College.find().select('name');
        nodeCache.set("collegeList", collegeList, 36000);
        return collegeList;
    }
    catch(err) {
        console.log("Error in fetching of College List: ", err);
        return [];
    }
}


module.exports = {
    adminAddCollege,
    adminApproveAmbassdor,
    adminInviteAmbassdor,
}