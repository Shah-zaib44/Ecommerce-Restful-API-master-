const asyncHandler = require("../middleware/async");

const con = require("../config/db");

exports.getTasks = asyncHandler((req, res) => {
  let sql = `SELECT * FROM todoList`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  });
});

exports.createTask = asyncHandler((req, res) => {
  let task = JSON.parse(JSON.stringify(req.params.task));

  let sql = `INSERT INTO todoList (item) VALUES ('${task}')`;
  con.query(sql, function (err) {
    if (err) throw err;
    res.status(200).json({
      success: true,
      data: "created",
    });
  });
});
exports.deleteTask = asyncHandler((req, res) => {
  console.log(req);
  con.query(`delete from todoList where id=${req.params.id}`, function (err) {
    if (err) throw err;
    res.status(200).json({
      success: true,
      data: "deleted",
    });
  });
});
