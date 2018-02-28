const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const battleSchema = new Schema(
    {
        games:[],
        date:String,
        category      : { type: String, enum: ['','',''], required: true },
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

module.exports = mongoose.model("User", userSchema);