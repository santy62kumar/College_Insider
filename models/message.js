const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    msgType: {
        type: String,
        required: true,
    },
    msg: {
        type: String,
    },
    url: {
        type: String,
    }
}, {timestamps: true});


const Message = mongoose.model("message", messageSchema);

module.exports = Message;