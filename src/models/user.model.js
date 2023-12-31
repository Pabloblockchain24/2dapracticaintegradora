const mongoose =require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password:String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart'
    }],
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
})

userSchema.plugin(mongoosePaginate)
const User = mongoose.model("user", userSchema)

module.exports = User