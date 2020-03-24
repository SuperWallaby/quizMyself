import React from "react";
import { LANG } from "../../../App";

interface IProps {
  hint?: string;
}

const Hint: React.FC<IProps> = ({ hint }) => {
  if (!hint) return <span />;
  return (
    <h4
      style={{
        color: "#B9B9B9"
      }}
    >
      {LANG["hint"]} : {hint}{" "}
    </h4>
  );
};

export default Hint;
