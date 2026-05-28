import AiLearn from "../pages/AiLearn";

function Dashboard({

  theme,

  setTheme
}) {

  return (

    <AiLearn
      theme={theme}
      setTheme={setTheme}
    />

  );
}

export default Dashboard;