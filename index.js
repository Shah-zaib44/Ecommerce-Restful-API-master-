var express = require("express");
const dotenv = require("dotenv");

const task = require("./Backend/routes/task");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config({ path: "./Backend/config/config.env" });
const con = require("./Backend/config/db");
con;
var app = express();

app.use("/todolist", task);
app.use(cookieParser());

app.use(cors());
const PORT = process.env.PORT || 3000;
app.listen(
  PORT,
  console.log(
    `Server ${process.env.PORT} is running in ${process.env.NODE_ENV} `
  )
);
