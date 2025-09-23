import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../services/firebase";
import { useToast } from "../components/Toast.jsx";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { notify } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Trim inputs
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    // Basic password policy: 6+ chars, at least one letter and number
    const hasMinLen = trimmedPassword.length >= 6;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    if (!(hasMinLen && hasLetter && hasNumber)) {
      setError("Password must be 6+ chars, include letters and numbers");
      return;
    }
    try {
      const cred = await createUserWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
      if (trimmedName) {
        await updateProfile(cred.user, { displayName: trimmedName });
      }
      notify("Registration successful", { type: "success" });
      navigate("/");
    } catch (err) {
      const msg = err.message || "Registration failed";
      setError(msg);
      if (err.code === "auth/email-already-in-use") {
        notify("Email already registered. Please log in.", { type: "error" });
        navigate("/login");
      } else {
        notify("Registration failed", { type: "error" });
      }
    }
  };

  return (
    <div className="container-center">
      <div className="card" style={{ width: 420 }}>
      <h2>📝 Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p style={{ marginTop: 12 }}>
        Already have an account? <Link className="link-muted" to="/login">Login</Link>
      </p>
      </div>
    </div>
  );
}
