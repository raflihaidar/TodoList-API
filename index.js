import http from "http";
import { TodoList } from "./TodoListService.js";

const todoList = new TodoList();
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  if (req.method === "GET") {
    todoList.getTodoList(req, res);
  } else if (req.method === "POST") {
    todoList.createNewTodoItem(req, res);
  } else if (req.method === "PUT") {
    todoList.editTodoItem(req, res);
  } else {
    todoList.deleteTodoItem(req, res);
  }
});

server.listen(3000);
