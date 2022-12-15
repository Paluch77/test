import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentURL } from "./functions";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function UserData() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const pathURL = getCurrentURL();

  const reduxData = useSelector((state) => state);

  console.log("userData");

  useEffect(() => {
    reduxData.user.length > 0 ? setLoading(true) : setLoading(false);
  }, []);

  return (
    <div>
      {" "}
      <li className="flex  ">
        {loading ? (
          <img
            className="mr-4 h-8 w-8 rounded-2xl"
            // src={props.actualUser.photo}
            src={reduxData.user[0].userPhoto}
            alt="profilePhoto"
          />
        ) : (
          ""
        )}
        <p className=" rounded-xl bg-classic-blue px-4 text-center text-white">
          {/* {props.actualUser.nick} */}
          {loading ? reduxData.user[0].username : ""}
        </p>
      </li>
      {pathURL.includes("/new_product") ? (
        " "
      ) : (
        <li
          onClick={() => {
            navigate("/new_product");
          }}
          className="my-4"
        >
          Dodaj produkt
        </li>
      )}
    </div>
  );
}

export default UserData;
