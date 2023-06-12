import React from "react";
import styles from "./Button.module.css";
const Button = (props: any) => {
  return <button className={styles.Button} {...props}></button>;
};

export default Button;
