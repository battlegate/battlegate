const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username:String,
        password:String,
        email:String,
        games:[],
        picture:String,
    },
    {
        timestamps:{
            createdAt:"created_at",
            updatedAt:"updated_at"
        }
    }
    );

module.exports = mongoose.model("User", userSchema);
