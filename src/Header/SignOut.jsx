import React from "react";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../SignUp/userSlice";

function SignOut(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let stan = useSelector((state) => state.user);

  const signOutFunc = () => {
    signOut(props.auth).then(() => {
      dispatch(userLogout([]));
      // navigate("/home");
    });
  };
  return (
    <div>
      <button
        onClick={() => signOutFunc()}
        className="absolute right-0 bottom-0  m-2 rounded-xl bg-classic-blue py-2 px-6 text-lg text-white"
      >
        Sign out
      </button>
    </div>
  );
}

export default SignOut;
