import React from "react";
import classes from "./RNAInput.module.scss";
import Button from "../../UI/Button/Button";

interface RNAInputProps {
  onInput: (rna: string) => void;
  value: string;
  onSubmit: () => void;
}

function RNAInput({ onInput, value, onSubmit }: RNAInputProps) {
  return (
    <React.Fragment>
      <input
        type="text"
        className={classes.input}
        onChange={(e) => onInput(e.target.value)}
        value={value}
        placeholder="Enter RNA or DNA"
      />
      <Button onClick={onSubmit}>GO</Button>
    </React.Fragment>
  );
}

export default RNAInput;