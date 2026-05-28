import { useState } from "react";
import "./../styles/onboarding.css";

function Onboarding({

  onFinish

}) {

  const [selected, setSelected] =
    useState("");

  const options = [
    "School",
    "Intermediate",
    "B.Tech",
    "Programming",
    "Competitive Exams",
    "Other"
  ];

  return (

    <div className="onboarding-page">

      {/* GLOW */}

      <div className="bg-glow glow1"></div>
      <div className="bg-glow glow2"></div>

      {/* CONTENT */}

      <div className="onboarding-content">

        <p className="mini-text">
          Personalized AI Learning
        </p>

        <h1>
          What are you studying?
        </h1>

        <p className="subtitle">
          Choose your learning journey.
        </p>

        {/* OPTIONS */}

        <div className="options-wrap">

          {options.map((item, index) => (

            <button

              key={index}

              className={`option-pill ${
                selected === item
                  ? "active"
                  : ""
              }`}

              onClick={() =>
                setSelected(item)
              }
            >
              {item}

            </button>

          ))}

        </div>

        {/* BUTTON */}

        <button

          className="continue-btn"

          onClick={() => {

            localStorage.setItem(
              "studyType",
              selected
            );

            onFinish();
          }}
        >
          Continue →
        </button>

      </div>

    </div>
  );
}

export default Onboarding;