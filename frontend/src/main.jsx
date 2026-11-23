 import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./i18n/i18n";

import App from "./App.jsx";

// Apply saved theme before rendering the application
const savedTheme = localStorage.getItem("darkTheme");

if (savedTheme === "true") {
  document.documentElement.classList.add("dark-theme");
} else {
  document.documentElement.classList.remove("dark-theme");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);