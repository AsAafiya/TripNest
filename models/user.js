const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
//pbkdf2 hashing algorithm is used in the passport

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose);//add uusername+salt and password+salt

module.exports = mongoose.model("User", userSchema);