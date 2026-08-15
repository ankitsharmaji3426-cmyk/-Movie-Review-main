// client/src/services/adminApi.js
import { api } from "./api.js";

export const addMovie = (data) => api.post("/movies", data);
export const updateMovie = (id, data) => api.put(`/movies/${id}`, data);
export const deleteMovie = (id) => api.delete(`/movies/${id}`);
export const getMovie = (id) => api.get(`/movies/${id}`);
export const getMovies = (params = {}) => api.get("/movies", { params });
