const express = require("express");
const router = express.Router();
const { getTasks, deleteTask, createTask } = require("../controllers/task");

router.route("/createTask/:task").post(createTask);
router.route("/task").get(getTasks);
router.route("/task/:id").delete(deleteTask);

module.exports = router;
