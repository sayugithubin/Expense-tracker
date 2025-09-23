import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase";
import { useToast } from "../components/Toast.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { notify } = useToast();
  const googleProvider = new GoogleAuthProvider();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      notify("Welcome back!", { type: "success" });
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
      notify("Login failed", { type: "error" });
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      notify("Signed in with Google", { type: "success" });
      navigate("/");
    } catch (err) {
      setError(err.message || "Google sign-in failed");
      notify("Google sign-in failed", { type: "error" });
    }
  };

  return (
    <div className="container-center">
      <div className="card" style={{ width: 400 }}>
      <h2>🔑 Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div style={{ marginTop: 10 }}>
        <button type="button" onClick={handleGoogle} style={{ width: "100%" }}>
          Continue with Google
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      <p style={{ marginTop: "1rem" }}>
        Don’t have an account? <Link className="link-muted" to="/register">Register</Link>
      </p>
      </div>
    </div>
  );
}
