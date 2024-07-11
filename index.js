const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');


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

app.get("/", (req, res) => {
    const data = {
        carousel_cards: [
            {
                img_src: "/assets/college-overview.jpg",
                title: "Overview",
                description: "Get all round information of the college before joining.",
            },
            {
                img_src: "/assets/connect_student.png",
                title: "Connect",
                description: "Chat with the Almuni of the College.",
            },
            {
                img_src: "/assets/college_ambassdor.jfif",
                title: "Ambassdor",
                description: "Be the Representative of Your College and help other students to find their dream college.",
            },
            {
                img_src: "/assets/need_help.jpg",
                title: "Need Help?",
                description: "Talk to us for clearing any Doubts!",
            },
        ],

        college_cards: [
            {
                img_src: "/assets/iiit_bh.jfif",
                title: "IIIT Bhagalpur",
                description: "It is one of the National Institute of Importance located in the city of Bhagalpur.",
            },
            {
                img_src: "/assets/iiit_bh.jfif",
                title: "IIIT Bhagalpur",
                description: "It is one of the National Institute of Importance located in the city of Bhagalpur.",
            },
            {
                img_src: "/assets/iiit_bh.jfif",
                title: "IIIT Bhagalpur",
                description: "It is one of the National Institute of Importance located in the city of Bhagalpur.",
            },
            {
                img_src: "/assets/iiit_bh.jfif",
                title: "IIIT Bhagalpur",
                description: "It is one of the National Institute of Importance located in the city of Bhagalpur.",
            },
            {
                img_src: "/assets/iiit_bh.jfif",
                title: "IIIT Bhagalpur",
                description: "It is one of the National Institute of Importance located in the city of Bhagalpur.",
            },
            {
                img_src: "/assets/iiit_bh.jfif",
                title: "IIIT Bhagalpur",
                description: "It is one of the National Institute of Importance located in the city of Bhagalpur.",
            },
        ],
    };

    res.render("index", data);
});



app.listen(PORT, () => {
    console.log("Server is listening on Port: ", PORT);
});