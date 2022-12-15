import React from "react";
import { useRef, useMemo } from "react";
import { styles, getCurrentURL } from "./functions";
import { Link } from "react-router-dom";
import SignOut from "./SignOut";
import UserData from "./UserData";

function BurgerMenu(props) {
  const navOpen = useRef(null);
  const firstLine = useRef(null);
  const secondLine = useRef(null);
  const pathURL = getCurrentURL();
  console.log("burger");

  const turnOn = () => {
    const translateOff = "translate--off";
    const firstLineTransition = "translate-y-1.5 rotate-45";
    const secondLineTransition = "-translate-y-1.5 -rotate-45 w-8";
    const secondLineTransitionRemove = "w-6";

    if (firstLine.current.classList.contains("translate--off")) {
      styles(firstLine.current, firstLineTransition);
      styles(secondLine.current, secondLineTransition);
      styles(secondLine.current, secondLineTransitionRemove, "remove");
      firstLine.current.classList.remove(translateOff);
    } else {
      styles(firstLine.current, firstLineTransition, "remove");
      styles(secondLine.current, secondLineTransition, "remove");
      styles(secondLine.current, secondLineTransitionRemove);
      firstLine.current.classList.add(translateOff);
    }

    if (navOpen.current.classList.contains("-translate-x-full")) {
      styles(navOpen.current, "-translate-x-full", "remove");
      styles(navOpen.current, "-translate-x-0");
    } else {
      styles(navOpen.current, "-translate-x-0", "remove");
      styles(navOpen.current, "-translate-x-full");
    }
  };

  return (
    <div>
      <nav className="relative z-10 flex h-16 w-16 items-center justify-center ">
        <div
          onClick={() => {
            turnOn();
          }}
          className=" group flex h-12 w-12 cursor-pointer items-center justify-center rounded-3xl bg-white p-2 hover:bg-slate-200"
        >
          <div className="space-y-2">
            <span
              ref={firstLine}
              className="translate--off block h-1 w-8 origin-center rounded-full bg-titles transition-transform ease-in-out"
            ></span>
            <span
              ref={secondLine}
              className="block h-1 w-6 origin-center rounded-full bg-classic-blue transition-transform ease-in-out"
            ></span>
          </div>
        </div>
      </nav>

      <nav
        ref={navOpen}
        className=" absolute left-0 top-0 h-screen w-screen -translate-x-full transform bg-white pt-20 shadow-md duration-300"
      >
        <ul className="space-y-6 px-4 pt-4 text-lg text-titles">
          <li>
            <input
              className="w-full  rounded-xl border-2 py-2 px-2 duration-300 hover:border-classic-blue"
              type="text"
              placeholder="Search..."
            ></input>
          </li>
          <li>Pages</li>
          <li>
            <div>Categories</div>
          </li>
          <li>
            <a>Popular</a>
          </li>
          <li>
            {" "}
            {pathURL.includes("/signup") ? (
              " "
            ) : props.currentUser ? (
              " "
            ) : (
              <Link to="/signup">Log In | Sign Up</Link>
            )}
          </li>
          {props.currentUser ? <UserData /> : ""}
        </ul>
        {props.currentUser ? <SignOut auth={props.auth} /> : ""}
      </nav>
    </div>
  );
}

export default BurgerMenu;
