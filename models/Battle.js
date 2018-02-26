const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const battleSchema = new Schema(
    {
        game:???,
        date:String,
        type:???,
        place:String,
        price:String,
        description:String,
        members:???,
    },
    {
        timestamps:{
            createdAt:"created_at",
            updatedAt:"updated_at"
        }
    }
    );

module.exports = mongoose.model("User", userSchema);