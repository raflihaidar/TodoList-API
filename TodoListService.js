export class TodoList {
  todoList = ["Belajar Node JS", "Belajar Javascript Dasar"];

  getJsonTodoList() {
    const json = JSON.stringify({
      code: 200,
      status: "OK",
      data: this.todoList.map((value, index) => {
        return {
          id: index,
          todo: value,
        };
      }),
    });

    return json;
  }

  getTodoList(req, res) {
    res.write(this.getJsonTodoList());
    res.end();
  }

  createNewTodoItem(req, res) {
    req.on("data", (data) => {
      const body = JSON.parse(data.toString());

      if (!this.todoList[body.id] && !this.todoList.includes(body.todo)) {
        this.todoList.push(body.todo);
        res.write(this.getJsonTodoList());
      } else {
        res.write("Todo Item is Available");
      }
      res.end();
    });
  }

  editTodoItem(req, res) {
    req.on("data", (data) => {
      const body = JSON.parse(data.toString());
      if (this.todoList[body.id]) {
        this.todoList[body.id] = body.todo;
        res.write(this.getJsonTodoList());
      } else {
        res.write("UPDATE ERROR : ID  Not Match");
      }
      res.end();
    });
  }

  deleteTodoItem(req, res) {
    req.on("data", (data) => {
      const body = JSON.parse(data.toString());
      if (this.todoList[body.id]) {
        this.todoList.splice(body.id, 1);
        res.write(this.getJsonTodoList());
      } else {
        res.write("DELETE ERROR : ID  Not Match");
      }
      res.end();
    });
  }
}
