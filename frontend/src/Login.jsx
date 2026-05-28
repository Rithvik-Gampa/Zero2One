import { useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./Login.css";

function Login({ onLogin }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const handleLogin = () => {
    if (!username || !password) return alert("Fill all fields");
    onLogin(username);
  };

  return (
    <div className="login-bg">

    <Particles
  id="tsparticles"
  init={particlesInit}
  options={{
    fullScreen: { enable: false },   // IMPORTANT
    background: { color: "transparent" },
    particles: {
      number: { value: 80 },
      color: { value: "#ffffff" },
      size: { value: 3 },
      move: {
        enable: true,
        speed: 1.5
      },
      opacity: { value: 0.6 },
      links: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.3,
        width: 1
      }
    }
  }}
/>

      {/* LOGIN CARD */}
      <div className="chalkboard">

        <h1 className="chalk-title">Login</h1>

        <div className="floating-group">
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Username</label>
        </div>

        <div className="floating-group">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Enter
        </button>

      </div>

    </div>
  );
}

export default Login;