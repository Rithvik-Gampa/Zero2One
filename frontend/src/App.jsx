import {

  doc,

  getDoc,

  setDoc

} from "firebase/firestore";
import { useState, useEffect } from "react";
import { onAuthStateChanged }
from "firebase/auth";

import { auth, db }
from "./firebase";
import LandingPage from "./components/LandingPage";
import Onboarding from "./components/Onboarding";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import AiLearn from "./pages/AiLearn";
import NotesQuiz from "./pages/NotesQuiz";
import StudyPlanner from "./pages/StudyPlanner";

import "./styles/main.css";

function App() {

const [user, setUser] =
  useState(null);

  const [streak, setStreak] =
  useState(1);

  const [theme, setTheme] =
    useState("dark");

const [showLanding, setShowLanding] =
  useState(true);

const [showOnboarding, setShowOnboarding] =
  useState(false);
  const [activePage, setActivePage] =
    useState("Home");

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  /* ================= AUTH ================= */

useEffect(() => {

  const unsubscribe =
    onAuthStateChanged(

      auth,

      (currentUser) => {

        setUser(currentUser);
      }
    );

  return () => unsubscribe();

}, []);

/* ================= STREAK ================= */

useEffect(() => {

  if(!user) return;

  const updateStreak =
    async () => {

      const userRef =
        doc(

          db,

          "users",

          user.uid
        );

      const userSnap =
        await getDoc(userRef);

      const today =
        new Date();

      const todayDate =
        today.toDateString();

      if(!userSnap.exists()){

        await setDoc(userRef, {

          streak:1,

          lastLogin:
            todayDate
        });

        setStreak(1);

        return;
      }

      const data =
        userSnap.data();

      const lastLogin =
        new Date(data.lastLogin);

      const diffTime =
        today - lastLogin;

      const diffDays =
        Math.floor(

          diffTime /

          (1000 * 60 * 60 * 24)
        );

      let newStreak =
        data.streak;

      if(diffDays === 1){

        newStreak += 1;

      }else if(diffDays > 1){

        newStreak = 1;
      }

      await setDoc(userRef, {

        streak:newStreak,

        lastLogin:todayDate

      });

      setStreak(newStreak);
    };

  updateStreak();

}, [user]);

/* ================= THEME ================= */

useEffect(() => {

  document.body.className =
    theme;

}, [theme]);

  const renderPage = () => {

    switch(activePage){

      case "Home":
        return (
          <Home

  setActivePage={setActivePage}

  streak={streak}
/>
        );

      case "AI Learn":
        return (
          <AiLearn
            theme={theme}
            setTheme={setTheme}
          />
        );

      case "Notes Quiz":
        return <NotesQuiz />;

      case "Study Planner":
        return <StudyPlanner />;

      default:
        return <Home />;
    }
  };

  if(showLanding && !user){

  return (

    <LandingPage

      onStart={() => {

  if(user){

    setShowLanding(false);

    setShowOnboarding(true);

  }else{

    alert(
      "Please login first"
    );
  }
}}

      theme={theme}

      setTheme={setTheme}
    />
  );
}

if(showOnboarding && !user){

  return (

    <Onboarding

      onFinish={() => {

        setShowOnboarding(false);
      }}
    />
  );
}

return (

  <div className="app-layout">

      <Sidebar

        activePage={activePage}

        setActivePage={setActivePage}

        sidebarOpen={sidebarOpen}

        setSidebarOpen={setSidebarOpen}

        theme={theme}

setTheme={setTheme}
      />

      <main className="main-content">

        {renderPage()}

      </main>

    </div>
  );
}

export default App;