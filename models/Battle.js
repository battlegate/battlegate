const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const battleSchema = new Schema(
    {
<<<<<<< HEAD
        name:String,
        games:[],
        date:String,
        category: String, 
        //{ type: String, enum: ['','',''], required: true },
=======
        title: String,
>>>>>>> fri
        place:String,
        description:String,
        descriptionEvent:String,
        path:String
    });

module.exports = mongoose.model("Battle", battleSchema);