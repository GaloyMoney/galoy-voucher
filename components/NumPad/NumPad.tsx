import React, { useState } from "react";
import styles from "./NumPad.module.css";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Button from "../Button/Button";
import ClearIcon from "@mui/icons-material/Clear";

interface Props {
  currentAmount: string;
  setCurrentAmount: (amount: string) => void;
  unit: string;
  secondaryAmount: string;
}

const Numpad = ({
  currentAmount,
  setCurrentAmount,
  unit,
  secondaryAmount,
}: Props) => {
  const handleChange = (digit: string) => {
    if (digit == "0" && currentAmount == "0") return;
    if (digit === "." && currentAmount.includes(".")) return;
    if (currentAmount.match(/(\.[0-9]{2,}$|\..*\.)/)) return;
    if (currentAmount.length > 14 || secondaryAmount.length > 14) return;

    setCurrentAmount(currentAmount + digit);
  };

  const handleBackspace = () => {
    setCurrentAmount(currentAmount.slice(0, -1));
  };

  const handleClearAll = () => {
    setCurrentAmount("0");
  };

  return (
    <div className={styles.numpad}>
      <Button className={styles.clearAll} onClick={handleClearAll}>
        <ClearIcon></ClearIcon> clear
      </Button>
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
        <button
          className={styles.button}
          disabled={unit === "SATS" ? true : false}
          onClick={() => handleChange(".")}
        >
          .
        </button>
        <button className={styles.button} onClick={() => handleChange("0")}>
          0
        </button>
        <button className={styles.button} onClick={handleBackspace}>
          <BackspaceIcon />
        </button>
      </div>
    </div>
  );
};

export default Numpad;
