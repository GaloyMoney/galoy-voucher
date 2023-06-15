import React, { useState } from "react";
import styles from "./Numpad.module.css";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Button from "../Button/Button";
import { ACTION_TYPE, ACTIONS } from "@/utils/reducers";
interface props {
  dispatch: React.Dispatch<ACTION_TYPE>;
}

const Numpad = ({ dispatch }: props) => {
  return (
    <div className={styles.numpad}>
      <div className={styles.grid}>
        <button
          className={styles.button}
          onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: "1" })}
        >
          1
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: "2" })}
        >
          2
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: "3" })}
        >
          3
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: "4" })}
        >
          4
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: "5" })}
        >
          5
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: "6" })}
        >
          6
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: "7" })}
        >
          7
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: "8" })}
        >
          8
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: "9" })}
        >
          9
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: "." })}
        >
          .
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: "0" })}
        >
          0
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
        >
          <BackspaceIcon></BackspaceIcon>
        </button>
      </div>
      <Button
        onClick={() => dispatch({ type: ACTIONS.CLEAR_INPUT })}
        className={styles.clearAll}
      >
        Clear All
      </Button>
    </div>
  );
};

export default Numpad;
