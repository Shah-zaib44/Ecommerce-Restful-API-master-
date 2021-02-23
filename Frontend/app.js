const form = {
  form: document.querySelector("#task-form"),
  btnaddTask: document.querySelector("#submit"),
};
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");

const taskInput = document.querySelector("#task");

loadEventListeners();

let tasks;

tasks = [];

function loadEventListeners() {
  document.addEventListener("DOMContentLoaded", getTasks);

  form.btnaddTask.addEventListener("click", addTask);

  taskList.addEventListener("click", removeTask);
}

function getTasks() {
  (async () => {
    const result = await fetch("http://localhost:3000/todolist/task", {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000/todolist/task",
      },
    });
    const article = await result.json();
    console.log(article);
    article.forEach(function (task) {
      const li = document.createElement("li");

      li.className = "collection-item";

      li.classList.add(task.id);
      li.appendChild(document.createTextNode(task.item));

      const link = document.createElement("a");

      link.className = "delete-item secondary-content";

      link.innerHTML = '<i class="fa fa-remove"></i>';

      li.appendChild(link);

      taskList.appendChild(li);
    });
  })();
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }

  const li = document.createElement("li");

  li.className = "collection-item";

  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement("a");

  link.className = "delete-item secondary-content";

  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(link);

  taskList.appendChild(li);

  tasks.push(taskInput.value);

  fetch(`http://localhost:3000/todolist/createTask/${taskInput.value}`, {
    method: "post",
  })
    .then((response) => response.json())
    .then(function (response) {
      console.log(response);
      if (response.success == true) {
        alert("Task has been added to database successfully");
      } else {
        alert("Unfortunately task has not been added to database");
      }
    });

  taskInput.value = "";

  e.preventDefault();
}

function removeTask(e) {
  let id = document.getElementsByClassName("collection-item").item(0)
    .classList[1];
  fetch(`http://localhost:3000/todolist/task/${id}`, {
    method: "delete",
  })
    .then((response) => response.json())
    .then(function (response) {
      if (response.success == true) {
        alert("item deleted");
      } else {
        alert("item cant be deleted");
      }
    });

  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You Sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}
