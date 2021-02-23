const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  //   con.query("CREATE DATABASE mydb", function (err, result) {
  //     if (err) throw err;
  //     console.log("Database created");
  //   });
  // var mysql =
  //   "CREATE TABLE todoList (id INT NOT NULL AUTO_INCREMENT,item VARCHAR(255), PRIMARY KEY (id))";
  // con.query(mysql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Table created");
  // });
});
module.exports = con;
