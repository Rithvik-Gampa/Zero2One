import { useState }
from "react";

import {

  createUserWithEmailAndPassword,

  signInWithEmailAndPassword,

  GoogleAuthProvider,

  signInWithPopup

} from "firebase/auth";

import { auth }
from "../firebase";

import "../styles/authmodal.css";

function AuthModal({

  showAuth,

  setShowAuth
}) {

  const [isLogin, setIsLogin] =
    useState(false);

    const [name, setName] =
  useState("");

const [email, setEmail] =
  useState("");

const [password, setPassword] =
  useState("");

const [confirmPassword,
setConfirmPassword] =
  useState("");

const [loading, setLoading] =
  useState(false);

  const handleAuth =
  async () => {

    if(
      !email ||
      !password
    ) return;

    if(
      !isLogin &&
      password !== confirmPassword
    ){
      alert(
        "Passwords do not match"
      );

      return;
    }

    try{

      setLoading(true);

      if(isLogin){

        await signInWithEmailAndPassword(

          auth,

          email,

          password
        );

      }else{

        await createUserWithEmailAndPassword(

          auth,

          email,

          password
        );
      }

      setShowAuth(false);

    }catch(error){

      alert(error.message);

    }finally{

      setLoading(false);
    }
};

const handleGoogleLogin =
  async () => {

    try{

      const provider =
        new GoogleAuthProvider();

      await signInWithPopup(

        auth,

        provider
      );

      setShowAuth(false);

window.location.reload();

window.location.reload();

    }catch(error){

      alert(error.message);
    }
};
  return (

    <>
      {
        showAuth && (

          <div className="auth-overlay">

            <div className="auth-modal">

              {/* CLOSE */}

              <button

                className="close-auth"

                onClick={() =>
                  setShowAuth(false)
                }
              >

                ✕

              </button>

              {/* TITLE */}

              <h2>

                {
                  isLogin
                  ?
                  "Welcome Back"
                  :
                  "Create Account"
                }

              </h2>

              <p className="auth-subtext">

                {
                  isLogin
                  ?
                  "Login to continue your AI learning journey."
                  :
                  "Start your smarter learning journey today."
                }

              </p>

              {/* FORM */}

              <div className="auth-form">

                {
                  !isLogin && (

                    <input

  type="text"

  placeholder="Full Name"

  value={name}

  onChange={(e)=>
    setName(e.target.value)
  }
/>
                  )
                }

                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}

onChange={(e)=>
  setEmail(e.target.value)
}
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}

onChange={(e)=>
  setPassword(e.target.value)
}
                />

                {
                  !isLogin && (

                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}

onChange={(e)=>
  setConfirmPassword(
    e.target.value
  )
}
                    />
                  )
                }

                <button

  className="auth-btn"

  onClick={handleAuth}
>

                  {
  loading
  ?
  "Please wait..."
  :
  isLogin
  ?
  "Login"
  :
  "Create Account"
}
                </button>

                {/* DIVIDER */}

                <div className="auth-divider">

                  <span>
                    OR
                  </span>

                </div>

                {/* GOOGLE */}

                <button

  className="google-btn"

  onClick={handleGoogleLogin}
>

                  🔵 Continue with Google

                </button>

              </div>

              {/* TOGGLE */}

              <p className="switch-auth">

                {
                  isLogin
                  ?
                  "Don't have an account?"
                  :
                  "Already have an account?"
                }

                <span

                  onClick={() =>
                    setIsLogin(!isLogin)
                  }
                >

                  {
                    isLogin
                    ?
                    " Sign Up"
                    :
                    " Login"
                  }

                </span>

              </p>

            </div>

          </div>
        )
      }
    </>
  );
}

export default AuthModal;