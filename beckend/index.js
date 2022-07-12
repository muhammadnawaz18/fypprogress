const express = require("express");
const app = express();
require("dotenv").config();
const connect = require("./db");
const userRouter = require("./routers/user");
const slotRouter = require("./routers/slot");

app.use(express.json());
app.use(userRouter);
app.use(slotRouter);
connect();

const PORT = 5000;
app.listen(PORT, (req, res) => {
  console.log(`Server running on ${PORT}`);
});
