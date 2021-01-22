var sql = require("mssql");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const connectDB=()=>sql.connect(process.env.config, function (err) {
    if (err) 
    {
        console.log(err);
    }
         var request = new sql.Request();
        });
        module.exports = connectDB;