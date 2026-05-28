import { useState } from "react";

import AuthModal
from "./AuthModal";
import "./../styles/landing.css";
import { motion } from "framer-motion";
import FeaturesSection from "./FeaturesSection";
import HowItWorks from "./HowItWorks";
import AboutSection from "./AboutSection";
function LandingPage({

  onStart,

  theme,

  setTheme

}) {
const [showAuth, setShowAuth] =
  useState(false);
  return (

    <div className="landing-page">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

        <div className="logo">
          📚 Study Companion AI
        </div>

        <div className="nav-links">

  <a href="#features">

    Features

  </a>

  <a href="#how-it-works">

    How It Works

  </a>

  <a href="#about">

    About

  </a>

</div>

        <div className="nav-actions">

  <button

  className="theme-toggle"

  onClick={() =>

    setTheme(

      theme === "dark"
      ?
      "light"
      :
      "dark"
    )
  }
>

  {
    theme === "dark"
    ?
    "🌙"
    :
    "☀️"
  }

</button>

 <button

  className="primary-btn"

  onClick={() =>
    setShowAuth(true)
  }
>

  Get Started

</button>

</div>

      </nav>

      {/* ================= HERO SECTION ================= */}

      <motion.section
  className="hero-section"

  initial={{ opacity: 0, y: 80 }}

  animate={{ opacity: 1, y: 0 }}

  transition={{
    duration: 1,
    ease: "easeOut"
  }}
>

        <div className="hero-left">

          <div className="hero-badge">
            🚀 AI Powered Learning Platform
          </div>

          <h1>
            Learn Smarter <br />
            with AI
          </h1>

          <p>
            Personalized explanations,
            interactive quizzes, real-life analogies,
            and AI-powered learning designed
            for students.
          </p>

          <div className="hero-buttons">

          <button

  className="primary-btn"

  onClick={() =>
    setShowAuth(true)
  }
>

  Start Learning

</button>

            <button

  className="secondary-btn"

  onClick={() => {

    document
      .getElementById("features")
      ?.scrollIntoView({

        behavior:"smooth"
      });
  }}
>

  Explore Features

</button>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="hero-right">

          <div className="floating-card card1">
            📘 Smart AI Tutoring
          </div>

          <div className="floating-card card2">
            ❓ Adaptive Quiz Engine
          </div>

          <div className="floating-card card3">
            🔊 Real-Life Learning
          </div>

          <div className="glow-circle"></div>

        </div>

      </motion.section>
<FeaturesSection />
<HowItWorks />
<AboutSection />
<AuthModal

  showAuth={showAuth}

  setShowAuth={setShowAuth}
/>
    </div>
  );
}

export default LandingPage;