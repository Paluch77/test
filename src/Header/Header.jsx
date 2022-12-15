import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { userStateUpdate } from "../SignUp/userSlice";

import BurgerMenu from "./BurgerMenu";

function Header() {
  // const [actualUser, setUser] = useState({
  //   nick: "",
  //   photo: "",
  // });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("header");
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const reduxState = useSelector((state) => state);

  const userFirebase = auth.currentUser;
  useEffect(() => {
    console.log(auth);
    if (reduxState.user.length < 1) {
      onAuthStateChanged(auth, async (user) => {
        let nickForDispatch;
        if (user) {
          const nickRef = doc(db, "users", user.uid);
          await getDoc(nickRef).then((data) => {
            const nickNameone = data.data().profileInfo.nickName;
            nickForDispatch = nickNameone;
            // setUser({ ...actualUser, nick: nickNameone });
          });
          await getDownloadURL(
            ref(storage, user.uid + "/userPhoto/profilePhoto")
          )
            .then((url) => {
              // setUser((actual) => ({ ...actual, photo: url }));
              if (!reduxState.user[0]) {
                console.log("przed", reduxState);
                dispatch(
                  userStateUpdate({
                    userPhoto: url,
                    userid: auth.currentUser.uid,
                    username: nickForDispatch,
                  })
                );
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    }
    console.log("po", reduxState);
  });

  return (
    <header>
      <div className="relative flex h-20 cursor-pointer items-center shadow-md">
        <figure
          onClick={() => {
            navigate("/home");
          }}
          className="relative flex basis-1/2 items-center pl-2"
        >
          <div className="z-10 h-16 w-16 bg-logo bg-cover "></div>
          <figcaption className=" z-10 text-2xl font-bold text-titles">
            Market
          </figcaption>
        </figure>
        <figure className="flex grow items-center justify-end  ">
          <div className="h-8 w-8 bg-shopping-cart bg-cover"></div>
          <div className="rounded-50 flex h-6 w-6 items-center justify-center rounded-full bg-classic-blue">
            <span className="text-sm font-bold text-white">0</span>
          </div>
        </figure>
        <BurgerMenu currentUser={userFirebase} auth={auth} />
      </div>
    </header>
  );
}

export default Header;
