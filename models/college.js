const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    state: {
        type: String,
    },
    img_src: {
        type: String,
    },
    url: {
        type: String,
    },
    rating: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0.0,
        min: 0.0,
        max: 5.0,
    },
    ratingNum: {
        type: Number,
        default: 0,
    }
}, {timestamps: true});


const College = mongoose.model("college", collegeSchema);

module.exports = College;