import React from "react";
import "./Button.scss";

const Button = ({ nameButton }) => {
  const determineClass = () => {
    if (nameButton === "Login") {
      return "button-login";
    } else if (nameButton === "Sign Up") {
      return "button-sign-up";
    } else {
      return "";
    }
  };

  const buttonClass = determineClass();
  return <button className={`button ${buttonClass}`}>{nameButton}</button>;
};

export default Button;
