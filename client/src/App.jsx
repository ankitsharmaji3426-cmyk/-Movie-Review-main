// client/src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Movies from "./Movies/Movies.jsx";
import MovieGrid from "./Movies/MovieGrid.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { setAuthToken } from "./services/api.js";
import { useAuth } from "./context/AuthContext.jsx"; // Import useAuth

import ActionMovies from "./Movies/ActionMovies.jsx";
import Romance from "./Movies/Romance.jsx";
import Drama from "./Movies/Drama.jsx";
import SciFi from "./Movies/Sci-Fi.jsx";

// Admin
import Dashboard from "./admin/Dashboard.jsx";
import AddMovie from "./admin/AddMovie.jsx";
import EditMovie from "./admin/EditMovie.jsx";
import MovieList from "./admin/MovieList.jsx";

export default function App() {
  const { user } = useAuth(); // Get user from AuthContext
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={
            token ? (
              user?.role === "admin" ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/movies" />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/register"
          element={
            token ? (
              user?.role === "admin" ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/movies" />
              )
            ) : (
              <Register />
            )
          }
        />

        <Route path="/movies" element={<Movies />}>
          <Route index element={<MovieGrid />} />
          <Route path="action" element={<ActionMovies />} />
          <Route path="romance" element={<Romance />} />
          <Route path="sci-fi" element={<SciFi />} />
          <Route path="drama" element={<Drama />} />
          <Route
            path=":id"
            element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Admin routes (protected by role="admin") */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add"
          element={
            <ProtectedRoute role="admin">
              <AddMovie />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/movies"
          element={
            <ProtectedRoute role="admin">
              <MovieList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit/:id"
          element={
            <ProtectedRoute role="admin">
              <EditMovie />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
