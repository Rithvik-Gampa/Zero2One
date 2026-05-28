import { useState } from "react";

import "../styles/ailearn.css";

function AiLearn() {

  const [concept, setConcept] =
    useState("");

  const [level, setLevel] =
    useState("Beginner");

  const [loading, setLoading] =
    useState(false);

  const [response, setResponse] =
    useState(null);
    
    const [activeTab, setActiveTab] =
  useState("explanation");

const [selectedAnswers, setSelectedAnswers] =
  useState({});

const [score, setScore] =
  useState(0);

const [quizFinished, setQuizFinished] =
  useState(false);

  const generateExplanation =
    async () => {

      if(!concept.trim()) return;

      try{

        setLoading(true);

        const res = await fetch(

`${import.meta.env.VITE_API_URL}/generate`,

{

  method:"POST",

  headers:{
    "Content-Type":
    "application/json"
  },

  body:JSON.stringify({

    concept,

    level
  })
}
);

        const data =
          await res.json();

        setResponse(data);

        setSelectedAnswers({});

setScore(0);

setQuizFinished(false);

setActiveTab("explanation");

      }catch(error){

        console.log(error);

      }finally{

        setLoading(false);
      }
    };
const handleOptionClick =
  (qIndex, option) => {

    if(selectedAnswers[qIndex])
      return;

    const correctAnswer =
      response.quiz[qIndex].answer;

    const updatedAnswers = {

      ...selectedAnswers,

      [qIndex]: option
    };

    setSelectedAnswers(
      updatedAnswers
    );

    if(option === correctAnswer){

      setScore(prev => prev + 1);
    }

    if(

      Object.keys(updatedAnswers)
      .length ===
      response.quiz.length

    ){

      setTimeout(() => {

        setQuizFinished(true);

      }, 500);
    }
  };
  return (

    <div className="ai-page">

      {/* HEADER */}

      <div className="ai-header">

        <h1 className="page-title">

  AI Learn

</h1>

        <p className="page-subtitle">

  Learn any concept with AI

</p>

      </div>

      {/* FORM */}

      <div className="ai-form">

        <input

          type="text"

          placeholder="Enter concept..."

          className="concept-input"

          value={concept}

          onChange={(e)=>
            setConcept(e.target.value)
          }
        />

        <div className="level-buttons">

  <button

    className={`level-btn ${
      level === "Beginner"
      ? "active"
      : ""
    }`}

    onClick={() =>
      setLevel("Beginner")
    }
  >

    Beginner

  </button>

  <button

    className={`level-btn ${
      level === "Exam Ready"
      ? "active"
      : ""
    }`}

    onClick={() =>
      setLevel("Exam Ready")
    }
  >

    Exam Ready

  </button>

  <button

    className={`level-btn ${
      level === "Real Life Analogy"
      ? "active"
      : ""
    }`}

    onClick={() =>
      setLevel("Real Life Analogy")
    }
  >

    Real Life Analogy

  </button>

</div>
        <button

  className={`generate-btn ${
    loading
    ? "loading"
    : ""
  }`}

  onClick={generateExplanation}

  disabled={loading}
>

  {
    loading
    ?

    <div className="loader-content">

      <div className="loader-spinner"></div>

      <span>
        AI is Thinking...
      </span>

    </div>

    :

    "✨ Generate"
  }

</button>

      </div>

      {/* RESPONSE */}

      {
  response && (

    <div className="response-card">

      {/* TABS */}

      <div className="tabs-row">

        <button

          className={`tab-btn ${
            activeTab === "explanation"
            ? "active"
            : ""
          }`}

          onClick={() =>
            setActiveTab(
              "explanation"
            )
          }
        >

          📘 Explanation

        </button>

        <button

          className={`tab-btn ${
            activeTab === "examples"
            ? "active"
            : ""
          }`}

          onClick={() =>
            setActiveTab(
              "examples"
            )
          }
        >

          💡 Examples

        </button>

        <button

          className={`tab-btn ${
            activeTab === "quiz"
            ? "active"
            : ""
          }`}

          onClick={() =>
            setActiveTab(
              "quiz"
            )
          }
        >

          ❓ Quiz

        </button>

      </div>

      {/* EXPLANATION */}

      {
        activeTab === "explanation"
        &&

        <div className="tab-content">

          <h2>
            Explanation
          </h2>

          <p>
            {response.explanation}
          </p>

        </div>
      }

      {/* EXAMPLES */}

      {
        activeTab === "examples"
        &&

        <div className="tab-content">

          <h2>
            Examples
          </h2>

          <div className="examples-list">

            {
  activeTab === "examples"
  &&

  <div className="tab-content">

   

    <div className="examples-list">

      <div className="examples-grid">

  {
    Array.isArray(response.examples)

    ?

    <div className="examples-grid">

  <div className="modern-example-card">

    <div className="example-icon">
      💡
    </div>

    <p>

      {
        Array.isArray(response.examples)

        ?

        response.examples
          .slice(0,3)
          .join(". ")

        :

        response.examples
      }

    </p>

  </div>

  <div className="modern-example-card">

    <div className="example-icon">
      🚀
    </div>

    <p>

      {
        Array.isArray(response.examples)

        ?

        response.examples
          .slice(3,6)
          .join(". ")

        :

        ""
      }

    </p>

  </div>

</div>

    :

    <div className="modern-example-card">

      <div className="example-icon">
        💡
      </div>

      <p>
        {response.examples}
      </p>

    </div>
  }

</div>

    </div>

  </div>
}

          </div>

        </div>
      }

      {/* QUIZ */}

      {
        activeTab === "quiz"
        &&

        <div className="tab-content">

          {
            quizFinished
            ?

            <div className="score-card">

              <h2>
                🎉 Quiz Completed
              </h2>

              <p>

                You scored
                {" "}
                {score}
                {" / "}
                {response.quiz.length}

              </p>

            </div>

            :

            <div className="quiz-list">

              {
                response.quiz.map(
                  (q,index)=>(

                    <div
                      key={index}
                      className="quiz-card"
                    >

                      <h3>

                        {index + 1}.
                        {" "}
                        {q.question}

                      </h3>

                      <div className="quiz-options">

                        {
                          q.options.map(
                            (option,i)=>{

                              const selected =
                                selectedAnswers[index];

                              const isCorrect =
                                option === q.answer;

                              const isWrong =
                                selected === option
                                &&
                                option !== q.answer;

                              return(

                                <button

                                  key={i}

                                  className={`quiz-option

                                    ${
                                      selected
                                      &&
                                      isCorrect
                                      ?
                                      "correct"
                                      :
                                      ""
                                    }

                                    ${
                                      isWrong
                                      ?
                                      "wrong"
                                      :
                                      ""
                                    }
                                  `}

                                  onClick={() =>
                                    handleOptionClick(
                                      index,
                                      option
                                    )
                                  }
                                >

                                  {option}

                                </button>
                              );
                            })
                        }

                      </div>

                    </div>
                  ))
              }

            </div>
          }

        </div>
      }

    </div>
  )
}
    </div>
  );
}

export default AiLearn;