import { useState } from "react";

import "../styles/studyplanner.css";

function StudyPlanner() {

  const [subject, setSubject] =
    useState("");

  const [examDate, setExamDate] =
    useState("");

  const [hours, setHours] =
    useState("");

  const [plan, setPlan] =
    useState([]);

    const [loading, setLoading] =
  useState(false);

const generatePlan = () => {

  if(
    !subject ||
    !examDate ||
    !hours
  ){
    return;
  }

  setLoading(true);

  setTimeout(() => {

    const generatedPlan = [

      {
        title:
          `Study ${subject} Fundamentals`,

        time:
          `${Math.floor(hours/2)} hrs`,

        priority:
          "High"
      },

      {
        title:
          `${subject} Practice Questions`,

        time:
          `${Math.floor(hours/3)} hrs`,

        priority:
          "Medium"
      },

      {
        title:
          `${subject} Revision`,

        time:
          `${Math.floor(hours/4)} hrs`,

        priority:
          "Low"
      }
    ];

    setPlan(generatedPlan);

    setLoading(false);

  }, 1400);
};

  return (

    <div className="planner-page">

      {/* HEADER */}

      <div className="planner-header">

        <h1 className="page-title">

  AI Study Planner

</h1>

        <p className="page-subtitle">

  Create a personalized study
  schedule instantly.

</p>

      </div>

      {/* WORKSPACE */}

      <div className="planner-layout">

        {/* LEFT */}

        <div className="planner-form">

          <input

            type="text"

            placeholder="Enter subject"

            value={subject}

            onChange={(e)=>
              setSubject(e.target.value)
            }
          />

          <input

            type="date"

            value={examDate}

            onChange={(e)=>
              setExamDate(e.target.value)
            }
          />

          <input

            type="number"

            placeholder="Study hours per day"

            value={hours}

            onChange={(e)=>
              setHours(e.target.value)
            }
          />

          <button

  className={`generate-plan-btn ${
    loading
    ? "loading"
    : ""
  }`}

  onClick={generatePlan}

  disabled={loading}
>

  {
    loading
    ?

    <div className="loader-content">

      <div className="loader-spinner"></div>

      <span>
        Building Plan...
      </span>

    </div>

    :

    "✨ Generate Plan"
  }

</button>

        </div>

        {/* RIGHT */}

        <div className="planner-output">

          {
            plan.length === 0
            ?

            <div className="empty-plan">

              <h2>
                Your AI plan will appear here
              </h2>

              <p>
                Enter details and generate
                your study plan.
              </p>

            </div>

            :

            <div className="plan-list">

              {plan.map((item,index)=>(

                <div
                  key={index}
                  className="plan-card"
                >

                  <div className="plan-top">

                    <h3>
                      {item.title}
                    </h3>

                    <span
                      className={`priority ${item.priority}`}
                    >

                      {item.priority}

                    </span>

                  </div>

                  <p>
                    ⏳ {item.time}
                  </p>

                </div>

              ))}

            </div>
          }

        </div>

      </div>

    </div>
  );
}

export default StudyPlanner;