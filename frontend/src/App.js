import React, { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./api";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    await createTodo({ title, description, completed: false });
    setTitle("");
    setDescription("");
    fetchTodos();
  };

  const toggleComplete = async (todo) => {
    await updateTodo(todo.id, {
      title: todo.title,
      description: todo.description,
      completed: !todo.completed,
    });
    fetchTodos();
  };

  const removeTodo = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div className="app">
      <div className="card">
        <h1>✨ Todo App</h1>

        <div className="input-group">
          <input
            placeholder="Todo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={addTodo}>Add Todo</button>
        </div>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <div onClick={() => toggleComplete(todo)}>
                <strong className={todo.completed ? "done-text" : ""}>
                  {todo.title}
                </strong>
                <p>{todo.description}</p>
              </div>

              <div className="actions">
                <span
                  className={`status ${todo.completed ? "done" : ""}`}
                >
                  {todo.completed ? "Done" : "Pending"}
                </span>
                <button
                  className="delete"
                  onClick={() => removeTodo(todo.id)}
                >
                  ✖
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
