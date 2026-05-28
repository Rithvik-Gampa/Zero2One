import "../styles/home.css";

function Home({

  setActivePage,

  streak

}) {

  const cards = [

    {
      icon:"🧠",
      title:"AI Learn",
      desc:"Generate explanations instantly"
    },

    {
      icon:"📝",
      title:"Notes Quiz",
      desc:"Convert notes into MCQs"
    },

    {
      icon:"📅",
      title:"Study Planner",
      desc:"Organize your preparation"
    }
  ];

  return (

    <div className="home-page">

      {/* HERO */}

      <div className="home-hero">

        <div>

          <p className="welcome-text">
            Welcome Back 👋
          </p>

          <h1 className="page-title">

  Ready to continue learning?

</h1>

          <p className="page-subtitle">

            Your AI-powered learning
            workspace is ready.

          </p>

        </div>

        <div className="streak-card">

          <h2>
            🔥 {streak} Day Streak
          </h2>

          <p>
            Keep learning daily to
            maintain your streak.
          </p>

        </div>

      </div>

      {/* QUICK ACTIONS */}

      <div>

        <h2 className="section-title">
          Quick Actions
        </h2>

        <div className="quick-grid">

          {cards.map((card,index)=>(

            <div

              key={index}

              className="quick-card"

              onClick={() =>
                setActivePage(card.title)
              }
            >

              <span>
                {card.icon}
              </span>

              <h3>
                {card.title}
              </h3>

              <p>
                {card.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* RECENT */}

      <div>

        <h2 className="section-title">
          Recent Activity
        </h2>

        <div className="recent-card">

          <p>
            ✅ Completed DBMS Quiz
          </p>

          <p>
            ✅ Generated AI Notes
          </p>

          <p>
            ✅ Planned Study Schedule
          </p>

        </div>

      </div>

    </div>
  );
}

export default Home;