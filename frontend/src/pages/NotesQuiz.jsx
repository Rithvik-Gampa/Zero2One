import { useState } from "react";

import "../styles/notesquiz.css";

function NotesQuiz() {

  const [notes, setNotes] =
    useState("");

  const [level, setLevel] =
    useState("Easy");

  const [loading, setLoading] =
    useState(false);

  const [quiz, setQuiz] =
    useState([]);

  const [selectedAnswers, setSelectedAnswers] =
    useState({});

    const allAnswered =

  quiz.length > 0 &&

  Object.keys(selectedAnswers)
    .length === quiz.length;

  const levels = [

    "Easy",

    "Intermediate",

    "Exam Ready"
  ];

  const generateQuiz =
    async () => {

      if(!notes.trim()) return;

      try{

        setLoading(true);

        setQuiz([]);

setSelectedAnswers({});

        setSelectedAnswers({});

        const res = await fetch(

          `${import.meta.env.VITE_API_URL}/generate`,

          {

            method:"POST",

            headers:{
              "Content-Type":
              "application/json"
            },

            body: JSON.stringify({

  concept: notes,

  level: "Beginner"
})
          }
        );

        const data =
          await res.json();

        setQuiz(data.quiz);

      }catch(error){

        console.log(error);

      }finally{

        setLoading(false);
      }
    };

  return (

    <div className="notes-page">

      {/* HEADER */}

      <div className="notes-header">

        <h1 className="page-title">

  Notes Quiz

</h1>

        <p className="page-subtitle">

  Convert notes into smart MCQs

</p>

      </div>

      {/* LEVELS */}

      <div className="levels-row">

        {levels.map((item,index)=>(

          <button

            key={index}

            className={`level-btn ${
              level === item
                ? "active"
                : ""
            }`}

            onClick={() =>
              setLevel(item)
            }
          >

            {item}

          </button>

        ))}

      </div>

      {/* WORKSPACE */}

      <div className="notes-layout">

        {/* LEFT */}

        <div className="notes-input-section">

          <textarea

            className="notes-textarea"

            placeholder="Paste notes here..."

            value={notes}

            onChange={(e)=>
              setNotes(e.target.value)
            }
          />

          <button

  className={`generate-quiz-btn ${
    loading
    ? "loading"
    : ""
  }`}

  onClick={generateQuiz}

  disabled={loading}
>

  {
    loading
    ?

    <div className="loader-content">

      <div className="loader-spinner"></div>

      <span>
        Creating Quiz...
      </span>

    </div>

    :

    "✨ Generate Quiz"
  }

</button>

        </div>

        {/* RIGHT */}

        <div className="quiz-preview">

          {
            quiz.length === 0
            ?

            <div className="empty-state">

              <h2>
                AI Quiz Preview
              </h2>

              <p>
                Generated MCQs appear here
              </p>

            </div>

            :

            <div className="quiz-list">

              {quiz.map((item,index)=>(

                <div
                  key={index}
                  className="quiz-card"
                >

                  <h3>

                    {index + 1}.
                    {" "}
                    {item.question}

                  </h3>

                  <div className="quiz-options">

                    {item.options.map((option,i)=>(

                      <button

                        key={i}

                        className={`quiz-option-btn

                          ${
                            selectedAnswers[index]
                            ?
                            option === item.answer
                            ?
                            "correct"
                            :
                            option === selectedAnswers[index]
                            ?
                            "wrong"
                            :
                            ""
                            :
                            ""
                          }
                        `}

                        onClick={() => {

                          if(
                            selectedAnswers[index]
                          ) return;

                          setSelectedAnswers({

                            ...selectedAnswers,

                            [index]:option
                          });
                        }}
                      >

                        {option}

                      </button>

                    ))}

                  </div>

                </div>

              ))}

            </div>
            
          }
        {
  allAnswered && (

    <div className="quiz-finished-card">

      <h2>
        🎉 Quiz Completed!
      </h2>

      <p>
        Ready for another challenge?
      </p>

      <button

        className="new-quiz-btn"

        onClick={generateQuiz}
      >

        🔄 Generate New Quiz

      </button>

    </div>
  )
}
        </div>

      </div>

    </div>
    
  );
}

export default NotesQuiz;