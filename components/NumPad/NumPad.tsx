import React, { useState } from "react";
import styles from "./NumPad.module.css";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Button from "../Button/Button";

interface Props {
  currentAmount: string;
  setCurrentAmount: (amount: string) => void;
}

const Numpad: React.FC<Props> = ({ currentAmount, setCurrentAmount }) => {
  const handleChange = (digit: string) => {
    setCurrentAmount(currentAmount + digit);
  };

  const handleBackspace = () => {
    setCurrentAmount(currentAmount.slice(0, -1));
  };

  const handleClearAll = () => {
    setCurrentAmount("");
  };

  return (
    <div className={styles.numpad}>
      <div className={styles.grid}>
        <button className={styles.button} onClick={() => handleChange("1")}>
          1
        </button>
        <button className={styles.button} onClick={() => handleChange("2")}>
          2
        </button>
        <button className={styles.button} onClick={() => handleChange("3")}>
          3
        </button>
        <button className={styles.button} onClick={() => handleChange("4")}>
          4
        </button>
        <button className={styles.button} onClick={() => handleChange("5")}>
          5
        </button>
        <button className={styles.button} onClick={() => handleChange("6")}>
          6
        </button>
        <button className={styles.button} onClick={() => handleChange("7")}>
          7
        </button>
        <button className={styles.button} onClick={() => handleChange("8")}>
          8
        </button>
        <button className={styles.button} onClick={() => handleChange("9")}>
          9
        </button>
        <button className={styles.button} onClick={() => handleChange(".")}>
          .
        </button>
        <button className={styles.button} onClick={() => handleChange("0")}>
          0
        </button>
        <button className={styles.button} onClick={handleBackspace}>
          <BackspaceIcon />
        </button>
      </div>
      <Button className={styles.clearAll} onClick={handleClearAll}>
        Clear All
      </Button>
    </div>
  );
};

export default Numpad;
