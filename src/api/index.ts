import axios from "axios";

const api = axios.create({
  baseURL: "https://rost-library-app.herokuapp.com/api/v1",
});

export const addBook = (payload: any) => api.post("/books", payload); //changed
export const getAllBooks = () => api.get("/books");
export const updateBookById = (bookId: any, payload: any) =>
  api.put(`/books/${bookId}`, payload);
export const deleteBookById = (bookId: any) => api.delete(`/books/${bookId}`);
export const getBookById = (bookId: any) => api.get(`/books/${bookId}`);
export const searchBook = (path: string) => api.get(`/books/search?${path}`);

export const addUser = (payload: any) => api.post("/users/register", payload); //changed
export const getAllUsers = () => api.get("/users");
export const updateUserById = (userId: any, payload: any, token: string) =>
  api.put(`/users/${userId}`, payload, {
    headers: {
      "auth-token": token,
    },
  });
export const deleteUserById = (userId: any) => api.delete(`/users/${userId}`);
export const getUserById = (userId: any) => api.get(`/users/${userId}`);
export const loginUser = (payload: any) => api.post("/users/login", payload);

const apis = {
  addBook,
  getAllBooks,
  updateBookById,
  deleteBookById,
  getBookById,
  searchBook,
  addUser,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getUserById,
};

export default apis;
