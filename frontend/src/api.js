import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getTodos = () => API.get("/todos");
export const getTodo = (id) => API.get(`/todos/${id}`);
export const createTodo = (todo) => API.post("/todos", todo);
export const updateTodo = (id, todo) => API.put(`/todos/${id}`, todo);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
