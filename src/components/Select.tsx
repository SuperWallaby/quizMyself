import React from "react";
import {
  Select,
  InputLabel,
  FormControl,
  makeStyles,
  createStyles,
  Theme
} from "@material-ui/core";
import { LANG } from "../App";

interface IProps {
  value: any;
  onChange: (value: any, name?: string) => void;
  id: string;
  label: string;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
);

const SelectBox: React.FC<IProps> = ({
  value,
  onChange,
  id,
  children,
  label
}) => {
  const classes = useStyles();
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);
  return (
    <FormControl className={classes.formControl} variant="outlined">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        native
        ref={inputLabel}
        value={value}
        labelWidth={labelWidth}
        onChange={e => {
          const { name, value } = e.target;
          onChange(value, name);
        }}
        inputProps={{
          name: "age",
          id: id
        }}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default SelectBox;
