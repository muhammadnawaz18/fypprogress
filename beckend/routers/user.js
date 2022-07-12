const express = require("express");
const router = express.Router();
const { getTheHelloWorld, signUp, signIn } = require("../controller/userController");

router.get("/api/test", getTheHelloWorld);
router.post("/api/signUp", signUp);
router.post("/api/signIn", signIn);

module.exports = router;
