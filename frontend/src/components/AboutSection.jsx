import "./../styles/aboutsection.css";

function AboutSection(){

  return(

    <section

  id="about"

  className="about-section"
>

      {/* LEFT */}

      <div className="about-left">

        <p className="about-tag">

          🚀 About Study Companion AI

        </p>

        <h2>

          Smarter Learning
          Powered by AI

        </h2>

        <p className="about-description">

          Study Companion AI is a modern
          AI-powered learning platform
          designed to help students learn
          faster, practice smarter, and
          stay consistent throughout their
          learning journey.

          From AI explanations and smart
          quizzes to personalized study
          planning, everything is built
          to make learning easier and
          more effective.

        </p>

      </div>

      {/* RIGHT */}

      <div className="about-right">

        <div className="about-card">

          <div className="about-item">

            <span>⚡</span>

            <p>
              AI Powered Learning
            </p>

          </div>

          <div className="about-item">

            <span>🧠</span>

            <p>
              Personalized Explanations
            </p>

          </div>

          <div className="about-item">

            <span>📚</span>

            <p>
              Smart Study Tools
            </p>

          </div>

          <div className="about-item">

            <span>🔥</span>

            <p>
              Daily Learning Streaks
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default AboutSection;