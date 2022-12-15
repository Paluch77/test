import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userStateUpdate } from "../userSlice";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function LoginButton(props) {
  const dispatch = useDispatch();
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state);

  const logIn = () => {
    const emailValue = props.email.current.value;
    const passwordValue = props.password.current.value;

    setPersistence(auth, browserSessionPersistence).then(() => {
      signInWithEmailAndPassword(auth, emailValue, passwordValue).then(
        (logged) => {
          let userNick = "";
          if (logged.user) {
            console.log("check");
            const nickRef = doc(db, "users", logged.user.uid);
            getDoc(nickRef).then((data) => {
              const nickNameone = data.data().profileInfo.nickName;
              userNick = nickNameone;
              console.log("work");
            });
            getDownloadURL(
              ref(storage, logged.user.uid + "/userPhoto/profilePhoto")
            )
              .then((url) => {
                dispatch(
                  userStateUpdate({
                    userPhoto: url,
                    userid: auth.currentUser.uid,
                    username: userNick,
                  })
                );
                navigate("/home");
              })
              .catch((error) => {
                console.log(error);
              });
          }
        }
      );
    });
  };

  return (
    <div>
      {" "}
      <button
        onClick={() => {
          logIn();
        }}
        className="mt-4 w-full rounded-xl bg-classic-blue py-2 font-bold text-white"
      >
        {" "}
        Log in{" "}
      </button>
    </div>
  );
}

export default LoginButton;
