import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import {
  Lightbulb,
  Moon,
  Sun
} from "lucide-react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CreateIdea from "./pages/CreateIdea";
import Ideas from "./pages/Ideas";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );

    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        <Link to="/" className="logo">
          <span className="logo-mark">
            <Lightbulb size={19} />
          </span>

          <span className="logo-text">
            Vichar<span>Manthan</span>
          </span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/ideas" className="nav-link">
            Explore
          </Link>

          <Link to="/create-idea" className="nav-link">
            Post Idea
          </Link>

          <Link to="/login" className="nav-link">
            Login
          </Link>

          <Link to="/register" className="btn btn-primary">
            Get Started
          </Link>

          <button
            className="theme-button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>
        </div>

      </div>
    </nav>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">

        <Navbar />

        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/create-idea"
            element={<CreateIdea />}
          />

          <Route
            path="/ideas"
            element={<Ideas />}
          />
        </Routes>

        <footer className="footer">
          VicharManthan · Turn ideas into reality.
        </footer>

      </div>
    </BrowserRouter>
  );
};

export default App;