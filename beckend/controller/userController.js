const { User } = require("../models/User")
const bcrypt = require("bcryptjs");

const getTheHelloWorld = async (req, res) => {
    try {

        res.send("Hello world")
    } catch (error) {
        console.log(error.message)
    }
}

const signUp = async (req, res) => {
    try {

        const check = await User.findOne({
            username: req.body.username
        })
        if (check) {
            return res.status(404).json({ status: 0, msg: "Use another username" })
        } else {

            const user = await User.create({
                username: req.body.username,
                password: req.body.password
            })
            const token = await user.generateAuthToken()
            const newUser = await user.save()
            if (newUser) {
                return res.status(201).json({ status: 1, msg: "Account Created", token, newUser })
            }
        }


    } catch (error) {
        return res.status(400).send(error);

    }
}

const signIn = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return res.status(400).json({ status: 0, msg: "Incorrect username" })
        } else {
            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if (!isMatch) {
                return res.status(404).json({ status: 0, msg: "Incorrect Password" })
            } else {
                const token = await user.generateAuthToken()
                return res.status(200).json({ status: 1, msg: "Login Succesfully", user, token })
            }
        }

    } catch (error) {
        return res.status(400).send(error);

    }
}
module.exports = { getTheHelloWorld, signUp, signIn }