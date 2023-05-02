const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    image: {
        public_id: String,
        url: String,
    },

    text: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

module.exports = mongoose.model("Page", pageSchema);