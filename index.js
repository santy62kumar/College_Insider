const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');


const PORT = process.env.PORT || 3000;

const app = express();

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());


//by default ejs will look into the views folder
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index");
});



app.listen(PORT, () => {
    console.log("Server is listening on Port: ", PORT);
});