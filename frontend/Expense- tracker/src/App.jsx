import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { observeUser } from "./utils/auth";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function useAuthUser() {
  const [user, setUser] = useState(null);
  useEffect(() => observeUser(setUser), []);
  return user; // undefined=loading, null=logged out, object=logged in
}

function ProtectedRoute({ children }) {
  const user = useAuthUser();
  if (user === undefined) return <div style={{ padding: 20 }}>Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const user = useAuthUser();
  if (user === undefined) return <div style={{ padding: 20 }}>Loading...</div>;
  return user ? <Navigate to="/" replace /> : children;
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('theme-dark');
    } else {
      root.classList.remove('theme-dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <>
      <div className="settings-panel" role="region" aria-label="Appearance settings">
        <div className="settings-row">
          <div className="settings-text">
            <div className="settings-title">Dark theme</div>
            <div className="settings-sub">Reduce brightness and use a dark color palette</div>
          </div>
          <label className="switch">
            <input
              type="checkbox"
              aria-label="Enable dark theme"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
            <span className="slider" />
          </label>
        </div>
      </div>
      <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
