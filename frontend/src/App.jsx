import { useState, useEffect } from "react";
import "./App.css";
import Login from "./Login";

function App() {

  /* ================= MAIN STATES ================= */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [concept, setConcept] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("explanation");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const [currentUser, setCurrentUser] = useState("");
  const [userStreak, setUserStreak] = useState(1);
  const [showDashboard, setShowDashboard] = useState(false);
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState("light");
const [placeholder, setPlaceholder] = useState("");   
  /* ================= AUDIO STATES ================= */
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  /* ================= DARK MODE ================= */
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  /* ================= ANIMATED PLACEHOLDER ================= */
useEffect(() => {
  const words = [
    "Maths...",
    "Science...",
    "Technology...",
    "Artificial Intelligence...",
    "Physics...",
    "Chemistry...",
    "Data Structures...",
    "Machine Learning..."
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingSpeed = 80;
  const deletingSpeed = 40;
  const delayBetweenWords = 1000;

  const typeEffect = () => {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      setPlaceholder(currentWord.substring(0, charIndex + 1));
      charIndex++;

      if (charIndex === currentWord.length) {
        setTimeout(() => (isDeleting = true), delayBetweenWords);
      }
    } else {
      setPlaceholder(currentWord.substring(0, charIndex - 1));
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
  };

  const interval = setInterval(typeEffect, 80);

  return () => clearInterval(interval);
}, []);

  /* ================= SPEECH ================= */
  const handleSpeak = (text) => {
    if (!text) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 0.95;
    speech.pitch = 1;

    speech.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(speech);
    setIsSpeaking(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    if (!isSpeaking) return;

    if (!isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  /* ================= GENERATE ================= */
  const generateExplanation = async () => {
    if (!concept.trim()) return;

    setLoading(true);
    setResponse(null);
    setSelectedAnswers({});
    setScore(0);
    setQuizFinished(false);

    try {
      const res = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concept, level }),
      });

      const data = await res.json();
      setResponse(data);
      setHistory(prev => [...prev, { concept, level }]);
      setActiveTab("explanation");

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  /* ================= QUIZ ================= */
  const handleOptionClick = (qIndex, option) => {
    if (selectedAnswers[qIndex]) return;

    const correctAnswer = response.quiz[qIndex].answer;

    const updatedAnswers = {
      ...selectedAnswers,
      [qIndex]: option,
    };

    setSelectedAnswers(updatedAnswers);

    if (option === correctAnswer) {
      setScore(prev => prev + 1);
    }

    if (Object.keys(updatedAnswers).length === response.quiz.length) {
      setTimeout(() => setQuizFinished(true), 600);
    }
  };

  /* ================= LOGIN ================= */
  if (!isLoggedIn) {
    return (
      <Login
        onLogin={(username) => {
          const users = JSON.parse(localStorage.getItem("users")) || {};
          const user = users[username];

          setCurrentUser(username);
          setUserStreak(user?.streak || 1);
          setIsLoggedIn(true);
        }}
      />
    );
  }

  return (
    <div className="app-container">

      {/* HEADER */}
      <header className="app-header">
        <div className="header-left">
          <h1>📚 Study Companion AI</h1>
          <p className="subtitle">
            Master any concept with personalized explanations
          </p>
        </div>

        <div className="header-right">
          <div className="streak-badge">
            🔥 {userStreak} Day Streak
          </div>

          <button
            className="dashboard-btn"
            onClick={() => setShowDashboard(true)}
          >
            Dashboard
          </button>
        </div>
      </header>

      {/* DASHBOARD */}
      {showDashboard && (
        <div className="dashboard-overlay">
          <div className="dashboard-panel">
            <h2>Dashboard</h2>
            <p><strong>User:</strong> {currentUser}</p>

            <div className="history-section">
              <h3>Previous Concepts</h3>
              {history.length === 0 ? (
                <p>No history yet</p>
              ) : (
                history.map((item, index) => (
                  <p key={index}>
                    {item.concept} ({item.level})
                  </p>
                ))
              )}
            </div>

            <div className="theme-toggle">
              <h3>Theme</h3>
              <button
                className="generate-btn"
                onClick={() =>
                  setTheme(theme === "light" ? "dark" : "light")
                }
              >
                Switch to {theme === "light" ? "Dark" : "Light"} Mode
              </button>
            </div>

            <button
              className="logout-btn"
              onClick={() => {
                setIsLoggedIn(false);
                setShowDashboard(false);
              }}
            >
              Logout
            </button>

            <button
              className="close-btn"
              onClick={() => setShowDashboard(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* MAIN */}
      {!showDashboard && (
        <main className="web-layout">

          <div className="form-section">
            <div className="form-group">
              <label>Concept Name</label>
              <input
  className="concept-input"
  type="text"
  placeholder={placeholder}
  value={concept}
  onChange={(e) => setConcept(e.target.value)}
  disabled={loading}
/>
            </div>

            <div className="form-group">
              <label>Learning Level</label>
              <select
                className="level-select"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                disabled={loading}
              >
                <option>Beginner</option>
                <option>Exam-Ready</option>
                <option>Real-Life Analogy</option>
              </select>
            </div>

            <button
              className="generate-btn"
              onClick={generateExplanation}
              disabled={loading}
            >
              {loading ? "Generating..." : "✨ Generate Explanation"}
            </button>
          </div>

          {response && (
            <div className="response-section">

              <div className="tabs-container">
                <button
                  className={`tab-btn ${activeTab === "explanation" ? "active" : ""}`}
                  onClick={() => setActiveTab("explanation")}
                >
                  📘 Explanation
                </button>

                <button
                  className={`tab-btn ${activeTab === "examples" ? "active" : ""}`}
                  onClick={() => setActiveTab("examples")}
                >
                  💡 Examples
                </button>

                <button
                  className={`tab-btn ${activeTab === "quiz" ? "active" : ""}`}
                  onClick={() => setActiveTab("quiz")}
                >
                  ❓ Practice Quiz
                </button>
              </div>

              <div className="tab-content">

                {/* EXPLANATION */}
                {activeTab === "explanation" && (
                  <div className="explanation-tab">
                    <div className="explanation-header">
                      <h3>Concept Explanation</h3>

                      <button
                        className="audio-btn"
                        onClick={() => handleSpeak(response.explanation)}
                      >
                        🔊 Play
                      </button>

                      {isSpeaking && (
                        <button
                          className="audio-btn pause"
                          onClick={handlePauseResume}
                        >
                          {isPaused ? "▶ Resume" : "⏸ Pause"}
                        </button>
                      )}
                    </div>

                    <p className="explanation-text">
                      {response.explanation}
                    </p>
                  </div>
                )}

                {/* EXAMPLES */}
                {activeTab === "examples" && (
                  <div className="examples-tab">
                    <h3>Examples</h3>
                    {response.examples?.map((ex, index) => (
                      <div key={index} className="example-item">
                        <div className="example-number">{index + 1}</div>
                        <p>{ex}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* QUIZ */}
                {activeTab === "quiz" && (
                  <div className="quiz-tab">

                    {quizFinished ? (
                      <div className="final-result">
                        <h2>🎉 Quiz Completed!</h2>
                        <p>You scored {score} / {response.quiz.length}</p>
                        <button
                          className="retry-btn"
                          onClick={() => {
                            setSelectedAnswers({});
                            setScore(0);
                            setQuizFinished(false);
                          }}
                        >
                          🔄 Retry Quiz
                        </button>
                      </div>
                    ) : (
                      <div className="questions-list">
                        {response.quiz.map((q, index) => {

                          const selectedOption = selectedAnswers[index];
                          const correctAnswer = q.answer;

                          return (
                            <div key={index} className="quiz-question-item">
                              <p className="question-text">
                                {index + 1}. {q.question}
                              </p>

                              <div className="options-container">
                                {q.options.map((opt, i) => {

                                  const isSelected = selectedOption === opt;
                                  const isCorrect = opt === correctAnswer;

                                  return (
                                    <button
                                      key={i}
                                      className={`option-btn
                                        ${selectedOption && isCorrect ? "correct" : ""}
                                        ${isSelected && !isCorrect ? "incorrect" : ""}
                                      `}
                                      onClick={() =>
                                        handleOptionClick(index, opt)
                                      }
                                      disabled={!!selectedOption}
                                    >
                                      <span className="option-circle">
                                        {String.fromCharCode(65 + i)}
                                      </span>

                                      <span className="option-text">
                                        {opt}
                                      </span>

                                      
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>
          )}

        </main>
      )}

    </div>
  );
}

export default App;