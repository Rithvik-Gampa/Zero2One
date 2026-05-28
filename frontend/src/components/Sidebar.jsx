import { signOut }
from "firebase/auth";

import { auth }
from "../firebase";
import "../styles/sidebar.css";

function Sidebar({

  activePage,

  setActivePage,

  sidebarOpen,

  setSidebarOpen,

  theme,

  setTheme

})  {

  const menuItems = [

    {
      icon:"🏠",
      label:"Home"
    },

    {
      icon:"🧠",
      label:"AI Learn"
    },

    {
      icon:"📝",
      label:"Notes Quiz"
    },

    {
      icon:"📅",
      label:"Study Planner"
    }
  ];
const handleLogout =
  async () => {

    try{

      await signOut(auth);

      window.location.reload();

    }catch(error){

      console.log(error);
    }
};
  return (

    <aside
      className={`sidebar ${
        sidebarOpen
          ? "open"
          : "closed"
      }`}
    >

      {/* TOP */}

      <div>

        <button

          className="menu-btn"

          onClick={() =>
            setSidebarOpen(
              !sidebarOpen
            )
          }
        >
          ☰
        </button>

        {
          sidebarOpen && (

            <h2 className="logo">
              Study AI
            </h2>

          )
        }

        <div className="sidebar-menu">

          {menuItems.map((item,index)=>(

            <button

              key={index}

              className={`sidebar-item ${
                activePage === item.label
                  ? "active"
                  : ""
              }`}

              onClick={() =>
                setActivePage(item.label)
              }
            >

              <span>
                {item.icon}
              </span>

              {
                sidebarOpen && (
                  <span>
                    {item.label}
                  </span>
                )
              }

            </button>

          ))}

        </div>

      </div>

      {/* BOTTOM */}
      <div className="sidebar-theme">

  <button

    className="theme-toggle-sidebar"

    onClick={() => {

  const newTheme =
    theme === "dark"
    ? "light"
    : "dark";

  setTheme(newTheme);

  document.body.className =
    newTheme;
}}
  >

    {
      theme === "dark"
      ? "🌙 Dark"
      : "☀️ Light"
    }

  </button>

</div>
      <div className="sidebar-bottom">

        

        <button

  className="sidebar-item logout"

  onClick={handleLogout}
>

  🚪 Logout

</button>

      </div>

    </aside>
  );
}

export default Sidebar;