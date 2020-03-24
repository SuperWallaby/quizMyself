import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Tooltip
} from "@material-ui/core";
import { LANG } from "../../../App";
import { TtempOption } from "../../../types/declations";

interface IProps {
  classes: any;
  op: TtempOption;
  options: TtempOption[];
  setOptions: React.Dispatch<React.SetStateAction<TtempOption[]>>;
  index: number;
  onClickOptionDelete: (i: number) => void;
  onClickOptionCircle: (op: TtempOption) => void;
}

const Qoption: React.FC<IProps> = ({
  classes,
  options,
  setOptions,
  op,
  index: i,
  onClickOptionDelete: handleClickOptionDelete,
  onClickOptionCircle: handleClickOptionCircle
}) => {
  const handlePreventDefault = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl
      data-cy="optionForm"
      className={classes.optionFiled}
      variant="outlined"
    >
      <InputLabel htmlFor="option">{LANG["choice"]}</InputLabel>
      <OutlinedInput
        data-cy="optionI"
        labelWidth={50}
        onChange={e => {
          options[i].op = e.currentTarget.value;
          setOptions([...options]);
        }}
        endAdornment={
          <InputAdornment variant="outlined" position="end">
            {i !== 0 && (
              <Tooltip title={LANG["delete"]}>
                <IconButton
                  data-cy="iconDelete"
                  className="trashCanButton"
                  aria-label="toggle password visibility"
                  onClick={() => {
                    handleClickOptionDelete(i);
                  }}
                  onMouseDown={handlePreventDefault}
                  edge="end"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title={LANG["is_this_true"]}>
              <IconButton
                data-cy="iconTrue"
                aria-label="toggle password visibility"
                onClick={() => {
                  handleClickOptionCircle(op);
                }}
                onMouseDown={handlePreventDefault}
                edge="end"
              >
                {op.checked ? (
                  <CheckCircleOutlineIcon className="checkIcon" />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </IconButton>
            </Tooltip>
          </InputAdornment>
        }
        value={op.op}
        id="outlined-basic"
      />
    </FormControl>
  );
};

export default Qoption;
