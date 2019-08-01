import React from "react";

const Button: React.FC<{ text: string }> = ({ text }) => {
  return <a>text: {text}</a>;
};

export default Button;
