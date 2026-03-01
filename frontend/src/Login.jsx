import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (!username.trim() || !password.trim()) {
      triggerShake();
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || {};

      // REGISTER
      if (isRegistering) {
        if (users[username]) {
          setLoading(false);
          triggerShake();
          return;
        }

        users[username] = {
          password,
          streak: 1,
          lastLogin: new Date().toISOString().split("T")[0],
        };

        localStorage.setItem("users", JSON.stringify(users));
        setLoading(false);
        setIsRegistering(false);
        return;
      }

      // LOGIN
      const user = users[username];

      if (!user || user.password !== password) {
        setLoading(false);
        triggerShake();
        return;
      }

      // SUCCESS ANIMATION
      setSuccess(true);

      setTimeout(() => {
        onLogin(username);
      }, 900);

    }, 1200);
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <div className="login-container">
      <div className={`login-card ${shake ? "shake" : ""} ${success ? "success" : ""}`}>

        <div className="login-header">
          <img src="/logo.png" alt="Logo" className="login-logo" />
          <h1 className="app-title">STUDY COMPANION AI</h1>
          <h2>{isRegistering ? "Register" : "Login"}</h2>
        </div>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? <div className="spinner"></div> : isRegistering ? "Register" : "Login"}
        </button>

        <p
          className="toggle-auth"
          onClick={() => {
            setIsRegistering(!isRegistering);
            setPassword("");
          }}
        >
          {isRegistering
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </p>

      </div>
    </div>
  );
}

export default Login;