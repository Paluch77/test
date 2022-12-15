import React from "react";
import { useRef, useState } from "react";
import Header from "../../Header/Header";
import { app } from "../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function SignUp() {
  const signUpForm = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const additionalInfo = useRef(null);
  let init = app;
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  let navigate = useNavigate();
  const user = auth.currentUser;

  const loggedUser = useSelector((state) => state.user);
  console.log("state", loggedUser);
  const dispatch = useDispatch();

  const createNewUser = () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((cred) => {
        navigate("/signupdata");
        // console.log(cred.user);
        // signUpForm.current.classList.remove("flex");
        // signUpForm.current.classList.add("hidden");
        // additionalInfo.current.classList.remove("hidden");
        // additionalInfo.current.classList.add("flex");
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <div>
      <Header />
      <main className="text-titles">
        <section
          ref={signUpForm}
          className="flex h-min items-center justify-center py-20"
        >
          <ul className=" w-64 space-y-4 rounded-xl p-4 text-sm shadow-xl">
            <li>
              <h1 className=" py-10 text-center text-2xl font-bold">Sign Up</h1>
            </li>
            <li>
              <h1>Please enter your e-mail</h1>
            </li>
            <li>
              <input
                ref={email}
                className="w-full rounded-xl border-2 p-2 duration-300 hover:border-classic-blue"
                type="text"
                placeholder="Email..."
              ></input>
            </li>
            <li>Please enter your password:</li>
            <li>
              <input
                ref={password}
                className="w-full rounded-xl border-2 p-2 duration-300 hover:border-classic-blue"
                type="text"
                placeholder="Password..."
              ></input>
            </li>
            <li>
              <button
                onClick={() => {
                  createNewUser();
                }}
                className="mt-4 w-full rounded-xl bg-classic-blue py-2 font-bold text-white"
              >
                Submit
              </button>
            </li>
            <li className="text-center">
              {" "}
              Do you have account?
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="mt-4 w-full rounded-xl bg-classic-blue py-2 font-bold text-white"
              >
                {" "}
                Log in{" "}
              </button>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default SignUp;
