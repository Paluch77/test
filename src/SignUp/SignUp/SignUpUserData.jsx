import React from "react";
import { useRef, useState } from "react";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { doc, setDoc, getFirestore } from "firebase/firestore";
import { useDispatch } from "react-redux";
import Header from "../../Header/Header";

function SignUpUserData() {
  const [progressed, setProgress] = useState("0%");

  const dispatch = useDispatch();
  const firstName = useRef(null);
  const addFile = useRef(null);
  const lastName = useRef(null);
  const nickName = useRef(null);
  const storage = getStorage();
  const db = getFirestore();
  const additionalInfo = useRef(null);
  const auth = getAuth();
  const user = auth.currentUser;

  const userData = async (e) => {
    console.log(auth.currentUser.uid);
    console.log(addFile.current.files);

    const userPhotos = ref(
      storage,
      `${auth.currentUser.uid}/userPhoto/profilePhoto`
    );
    const upload = uploadBytesResumable(userPhotos, addFile.current.files[0]);
    upload.on("state_changed", (snapshot) => {
      const progressUpload =
        Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100) +
        "%";
      setProgress(progressUpload);
      setDoc(doc(db, `users`, auth.currentUser.uid), {
        profileInfo: {
          firstName: firstName.current.value,
          lastName: lastName.current.value,
          nickName: nickName.current.value,
        },
      });
      if (progressUpload === "100%") {
        console.log("dziala");
        // navigate("/home");
      }
    });
  };

  return (
    <div className="text-titles">
      <Header />
      <section
        ref={additionalInfo}
        className="flex h-min items-center justify-center py-20 "
      >
        <ul className=" w-64 space-y-4 rounded-xl p-4 text-sm shadow-xl">
          <li>
            <h1 className=" py-10 text-center text-2xl">User information</h1>
          </li>
          <li>Nickname</li>
          <li>
            <input
              ref={nickName}
              className="w-full rounded-xl border-2 p-2 duration-300 hover:border-classic-blue"
              type="text"
              placeholder="Nickname..."
            ></input>
          </li>
          <li>
            <h1>Your name</h1>
          </li>
          <li>
            <input
              ref={firstName}
              className="w-full rounded-xl border-2 p-2 duration-300 hover:border-classic-blue"
              type="text"
              placeholder="Name..."
            ></input>
          </li>
          <li>Last name</li>
          <li>
            <input
              ref={lastName}
              className="w-full rounded-xl border-2 p-2 duration-300 hover:border-classic-blue"
              type="text"
              placeholder="Last name..."
            ></input>
          </li>
          <li>Profile photo</li>
          <li>
            <input
              ref={addFile}
              className="w-full rounded-xl border-2 p-2 duration-300 hover:border-classic-blue"
              type="file"
              placeholder="Last name..."
            ></input>
          </li>
          <li>
            <button
              onClick={() => {
                userData();
              }}
              className="mt-4 w-full rounded-xl bg-classic-blue py-2 font-bold text-white"
            >
              Submit
            </button>
            <div
              className="mt-2 h-1 rounded-xl bg-classic-blue duration-300"
              style={{ width: `${progressed}`, duration: 500 }}
            ></div>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default SignUpUserData;
