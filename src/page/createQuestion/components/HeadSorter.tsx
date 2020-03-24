import React from "react";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { TquizType } from "../../../types/declations";
import { LANG } from "../../../App";

interface IProps {
  wrapCalsses: any;
  format: TquizType;
  handleFormat: (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    newformat: string[]
  ) => void;
}

const HeaderSoter: React.FC<IProps> = ({
  wrapCalsses,
  format,
  handleFormat
}) => {
  return (
    <ToggleButtonGroup
      className={wrapCalsses.space3}
      value={[format]}
      color=""
      onChange={handleFormat}
      aria-label="text formatting"
    >
      <ToggleButton
        data-cy="essayTab"
        value="essayQ"
        aria-label="essay question"
      >
        {LANG["essay_question"]}
      </ToggleButton>
      <ToggleButton
        data-cy="selectTab"
        value="multipleQ"
        aria-label="multiple question"
      >
        {LANG["multiple_question"]}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default HeaderSoter;
