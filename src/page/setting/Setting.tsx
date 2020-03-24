import React, { useState, Fragment } from "react";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TranslateIcon from "@material-ui/icons/Translate";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { LANG } from "../../App";
import {
  FormControl,
  InputLabel,
  Select,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from "@material-ui/core";
import { Tlangs } from "../../interface";
import RestorePageIcon from "@material-ui/icons/RestorePage";
import StarIcon from "@material-ui/icons/Star";
import SelectBox from "../../components/Select";
import { veritcalWrapStyle } from "../createQuestion/style";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    },
    list: {
      padding: 0
    }
  })
);

interface IProps {}

const Setting: React.FC<IProps> = () => {
  const wrapClasses = veritcalWrapStyle();
  const classes = useStyles();
  const [selectLang, setSelectLang] = useState<Tlangs>(
    localStorage.getItem("currentLang") as Tlangs
  );
  const [examCount, setExamCount] = useState(
    localStorage.getItem("exam-count") || 10
  );
  const [examMethod, setExamMethod] = useState(
    localStorage.getItem("exam-method") || "ai"
  );

  const handleLangChange = (lang: Tlangs) => {
    setSelectLang(lang);
    localStorage.setItem("currentLang", lang);
  };
  const handleCountChange = (count: number) => {
    setExamCount(count.toString());
    localStorage.setItem("exam-count", count.toString());
  };
  const handleMethodChange = (method: string) => {
    setExamMethod(method);
    localStorage.setItem("exam-method", method);
  };

  const settings = [
    {
      title: (
        <Fragment>
          <ListItem className={classes.list}>
            <ListItemIcon>
              <TranslateIcon />
            </ListItemIcon>
            <ListItemText primary={LANG["lang_setting"]} />
          </ListItem>
        </Fragment>
      ),
      content: (
        <div>
          <FormControl variant="outlined">
            <SelectBox
              label={LANG["lang"]}
              value={selectLang}
              onChange={handleLangChange}
              id="langBox"
            >
              <option value="ko">한국어</option>
              <option value="en">English</option>
              <option value="ar">عربى</option>
            </SelectBox>
          </FormControl>
          <IconButton
            onClick={() => {
              window.location.search = "";
              window.location.href =
                process.env.NODE_ENV === "development"
                  ? "localhost:3000/#/setting"
                  : "http://quizmyself.net/#/setting";
            }}
            color="primary"
            aria-label="Refresh to new langage"
          >
            <RestorePageIcon fontSize="large" />
          </IconButton>
        </div>
      )
    },
    {
      title: (
        <Fragment>
          <ListItem className={classes.list}>
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary={LANG["exame_setting"]} />
          </ListItem>
        </Fragment>
      ),
      content: (
        <div>
          <FormControl variant="outlined">
            <SelectBox
              label={LANG["max_count_setting"]}
              value={examCount}
              onChange={handleCountChange}
              id="langBox"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="1000">1000</option>
              <option value="10000">10000</option>
            </SelectBox>

            <SelectBox
              label={LANG["quiz_method"]}
              value={examMethod}
              onChange={handleMethodChange}
              id="langBox"
            >
              <option value="ai">{LANG["ai"]}</option>
              <option value="random">{LANG["random"]}</option>
              <option value="create">{LANG["created"]}</option>
            </SelectBox>
          </FormControl>
        </div>
      )
    }
  ];

  return (
    <div className={wrapClasses.root}>
      {settings.map(s => (
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{s.title}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>{s.content}</ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </div>
  );
};

export default Setting;
