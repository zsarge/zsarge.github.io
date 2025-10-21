import React from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-rickiest.css";
import "react-awesome-button/dist/styles.css";

const AwesomeButtonWrapper: React.FC<any> = (props) => {
  return <AwesomeButton {...props}>{props.children}</AwesomeButton>;
};

export default AwesomeButtonWrapper;
