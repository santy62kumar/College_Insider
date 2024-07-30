const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const College = require('./models/college');
const nodeCache = require("./services/nodeCache");
const db = require('./models/connection');
const { carousel_cards } = require("./constants/constants");
require('dotenv').config();

const adminRouter = require("./routes/admin");
const apiRouter = require("./routes/api");
const { restrictTo, restrictToLoggedinUserOnly } = require('./middlewares/auth');


const PORT = process.env.PORT || 3000;

const app = express();

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(helmet());


//by default ejs will look into the views folder
app.set('view engine', 'ejs');

//static files serving
app.use("/assets", express.static("views/assets"));
app.use("/css", express.static("views/css"));
app.use("/scripts", express.static("views/scripts"));


async function getTopCollege() {
    if(nodeCache.has("topColleges")){
        return nodeCache.get("topColleges");
    }
    
    const topColleges = await College.find().sort({ rating: -1 }).limit(10).select(['name', 'description', 'img_src']);
    nodeCache.set("topColleges", topColleges, 36000);
    return topColleges;
}

app.get("/", async (req, res) => {
    const data = {
        carousel_cards,

        // college_cards: [
        //     {
        //         img_src: "/assets/iiit_bh.jfif",
        //         title: "IIIT Bhagalpur",
        //         description: "It is one of the National Institute of Importance located in the city of Bhagalpur.",
        //     },
        //     {
        //         img_src: "/assets/iiit_bh.jfif",
        //         title: "IIIT Bhagalpur",
        //         description: "It is one of the National Institute of Importance located in the city of Bhagalpur.",
        //     },
        //     {
        //         img_src: "/assets/iiit_bh.jfif",
        //         title: "IIIT Bhagalpur",
        //         description: "It is one of the National Institute of Importance located in the city of Bhagalpur.",
        //     },
        //     {
        //         img_src: "/assets/iiit_bh.jfif",
        //         title: "IIIT Bhagalpur",
        //         description: "It is one of the National Institute of Importance located in the city of Bhagalpur.",
        //     },
        //     {
        //         img_src: "/assets/iiit_bh.jfif",
        //         title: "IIIT Bhagalpur",
        //         description: "It is one of the National Institute of Importance located in the city of Bhagalpur.",
        //     },
        //     {
        //         img_src: "/assets/iiit_bh.jfif",
        //         title: "IIIT Bhagalpur",
        //         description: "It is one of the National Institute of Importance located in the city of Bhagalpur.",
        //     },
        // ],

        college_cards: await getTopCollege(),
    };

    res.render("index", data);
});


app.get("/login", (req, res) => {
    res.render("login");
});


app.get("/signup", (req, res) => {
    res.render("signup");
});


app.get("/needhelp", (req, res) => {
    res.render("needhelp");
});


app.get("/ambassdor", (req, res) => {
    res.render("ambassdor");
});


app.get("/search", (req, res) => {
    res.render("profile");
});


app.use("/admin", adminRouter);
app.use("/api", apiRouter);


app.listen(PORT, () => {
    console.log("Server is listening on Port: ", PORT);
});