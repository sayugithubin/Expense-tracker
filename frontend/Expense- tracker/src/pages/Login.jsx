import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import { useToast } from "../components/Toast.jsx";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { notify } = useToast();
  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: "select_account" });

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

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      notify("Welcome back!", { type: "success" });
      navigate("/");
    } catch (err) {
      const code = err.code || "auth/unknown";
      const map = {
        "auth/user-not-found": "No account found for this email.",
        "auth/wrong-password": "Incorrect password.",
        "auth/invalid-credential": "Invalid credentials. Please try again.",
        "auth/too-many-requests": "Too many attempts. Please wait and try again.",
      };
      const msg = map[code] || err.message || "Login failed";
      setError(msg);
      notify(msg, { type: "error" });
    }
  };

  const handleReset = async () => {
    if (!email.trim()) {
      setError("Enter your email to reset password");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      notify("Password reset email sent", { type: "success" });
    } catch (err) {
      const msg = err.message || "Failed to send reset email";
      setError(msg);
      notify(msg, { type: "error" });
    }
  };

  return (
    <div className="container-center">
      <div className="card" style={{ width: 560, color: "#ffffff" }}>
        <h2 style={{ textAlign: "center" }}>Sign in</h2>
        <div style={{ display: "grid", gap: 16 }}>
          <button type="button" onClick={handleGoogle}>
            Continue with Google
          </button>
          <div style={{ height: 1, background: "#1f2937", margin: "6px 0" }} />
          <form onSubmit={handleEmailLogin} style={{ display: "grid", gap: 12 }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login with Email</button>
          </form>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button type="button" onClick={handleReset}>Forgot password?</button>
            <button type="button" onClick={() => navigate('/register')}>Create account</button>
          </div>
        </div>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
