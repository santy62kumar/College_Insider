const College = require("../models/college");

async function searchCollege(req, res) {
    const { page } = req.query;

    const pattern = req.params.term.split(/\s+/).join("|");
    const regx = new RegExp(pattern, "i");

    const limit = 20;
    const offset = (page - 1) * limit;

    try {
        const collegeList = await College.find(
            {
                $or: [
                    { name: regx },
                    { location: regx },
                    { state: regx }
                ]
            }
        ).skip(offset).limit(limit);;

        res.json({ collegeList });
    }
    catch(err) {
        console.log("Error in fetching of college search: ", err);
        //send the server error
        res.status(500).json({ error: 'Error in fetching Search Results.' })
    }
}


module.exports = {
    searchCollege,
}