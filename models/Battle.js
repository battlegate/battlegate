const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const battleSchema = new Schema(
    {
        title: String,
        place:String,
        description:String,
        descriptionEvent:String,
        path:String
    });

module.exports = mongoose.model("Battle", battleSchema);