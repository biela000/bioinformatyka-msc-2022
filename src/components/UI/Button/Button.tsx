import React from "react";
import classes from "./Button.module.scss";

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

function Button({ onClick, children, className }: ButtonProps) {
  return (
    <button className={`${classes.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;