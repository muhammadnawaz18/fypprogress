const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: false,
            trim: true
        },
        password: {
            type: String,
            required: false,
            trim: true
        }

    },
    {
        timestamps: true
    })

// GENERAING THE TOKEN FOR ADMIN
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = await jwt.sign({ user }, process.env.jwt)
    await user.save()
    return token
}

// HASHING THE PASSWORD
userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});
const User = mongoose.model("User", userSchema)

module.exports = { User }