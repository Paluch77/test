import React from "react";
import { useRef } from "react";
// import Header from "../../Header/Header";
import LoginButton from "./LoginButton";

function LogIn() {
  const signUpForm = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  console.log("login te sie rerenderuje");
  return (
    <div>
      {/* <Header /> */}
      <main className="text-titles">
        <section
          ref={signUpForm}
          className="flex h-min items-center justify-center py-20"
        >
          <ul className=" w-64 space-y-4 rounded-xl p-4 text-sm shadow-xl">
            <li>
              <h1 className=" py-10 text-center text-2xl font-bold">Log In</h1>
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

            <li className="text-center">
              {" "}
              <LoginButton email={email} password={password} />
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default LogIn;
