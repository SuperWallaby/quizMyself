import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

interface IProps {
  options: string[];
  expect: string;
  setExpect: React.Dispatch<React.SetStateAction<string>>;
}

const OptionsSelecter: React.FC<IProps> = ({ options, expect, setExpect }) => {
  const handleToggle = (value: string, checked: boolean) => {
    if (checked) setExpect("");
    else setExpect(value);
  };

  return (
    <List>
      {options.map((value, i) => {
        const labelId = `checkbox-list-label-${i}`;
        const checked = expect === value;

        return (
          <ListItem
            key={value + i}
            dense
            button
            onClick={() => {
              handleToggle(value, checked);
            }}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={value} />
            {/* <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction> */}
          </ListItem>
        );
      })}
    </List>
  );
};

export default OptionsSelecter;
