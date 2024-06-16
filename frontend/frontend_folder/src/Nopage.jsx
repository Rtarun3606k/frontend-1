import React from "react";
import { get_sessionstorage } from "./utils";
import { Link } from "react-router-dom";

export const Nopage = () => {
  return (
    <div>
      Nopage {get_sessionstorage()}{" "}
      <Link to={"/"}>
        {" "}
        <button>Go Back To Home</button>
      </Link>{" "}
    </div>
  );
};
