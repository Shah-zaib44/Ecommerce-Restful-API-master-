var express = require('express');
const dotenv = require("dotenv");
 const fileUpload=require('express-fileupload');
// const morgan=require('morgan');
// const logger=require('./middleware/logger')
const errorHandler=require('./middleware/error')
const products = require("./routes/products");
const cookieParser=require('cookie-parser')
const cors=require('cors');
 dotenv.config({ path: "./config/config.env" });
 const connectDB = require('./config/db');
 connectDB();
 var app = express();
app.use("/api/v1",fileUpload(),products);
app.use(cookieParser())
app.use(errorHandler);
app.use(cors());
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server ${process.env.PORT} is running in ${process.env.NODE_ENV} `
  )
  );

// // app.use(logger);
// if(process.env.NODE_ENV=='development')
// {
//   app .use(morgan('dev'));
// }
// app.get("/", (req, res) => {

//   res.send({ text: "Express" });
//   res.send("Express");
//   res.send("<h1>Express</h1>");
//   res.sendStatus(404);
//   res.status(404).json({ success: false });
//   res.status(200).json({
//     success: true,

//     data: {
//       id: 1,
//     },
//   });

