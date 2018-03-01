const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const battleSchema = new Schema(
    {
        name:String,
        games:[],
        date:String,
        category: String, 
        //{ type: String, enum: ['','',''], required: true },
        place:String,
        price:String,
        description:String,
        members: []
    },
    {
        timestamps:{
            createdAt:"created_at",
            updatedAt:"updated_at"
        }
    }
    );

module.exports = mongoose.model("Battle", battleSchema);