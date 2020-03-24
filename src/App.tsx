import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
// @ts-ignore
import {
  CreateQuestion,
  Exame,
  ManageQuestion,
  SettingPage
} from "./page/Pages";
import {
  Container,
  Tabs,
  AppBar,
  Tab,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core";
import { Helmet } from "react-helmet";
import { checkIndexDBsupport, useDB, DB, getLang } from "./helps";
import "./App.scss";
import favi from "../src/img/favi.png";
import Favicon from "react-favicon";
import SettingsIcon from "@material-ui/icons/Settings";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import { en } from "./lang/en";
import { kr } from "./lang/kr";
import { ar } from "./lang/ar";
import Snow from "./components/Snow";
import { Tlangs } from "./interface";
import SpeedDial, { SpeedDialProps } from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

export let LANG: any = en;

const langSetter = (lang: string) => {
  let stringLang: Tlangs = "en";
  if (lang.includes("ko")) {
    LANG = kr;
    stringLang = "ko";
  }
  if (lang.includes("ar")) {
    LANG = ar;
    stringLang = "ar";
  }
  localStorage.setItem("currentLang", stringLang);
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  bottomNav: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0
  }
}));

const useStylesFloat = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      transform: "translateZ(0px)",
      flexGrow: 1
    },
    radioGroup: {
      margin: theme.spacing(1, 0)
    },
    speedDial: {
      position: "fixed",
      "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
        bottom: theme.spacing(3),
        right: theme.spacing(3)
      },
      "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
        top: theme.spacing(2),
        left: theme.spacing(2)
      }
    }
  })
);

const App: React.FC = () => {
  const [direction, setDirection] = React.useState<SpeedDialProps["direction"]>(
    "up"
  );
  const floatStyle = useStylesFloat();
  checkIndexDBsupport();
  langSetter(getLang());
  const [currentTab, setCurrentTab] = useState(
    localStorage.getItem("lastTab") || "create-question"
  );
  const { loading } = useDB();
  const [snow, setSnow] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    localStorage.setItem("lastTab", currentTab);
  }, [currentTab]);

  if (!DB) return <div />;

  const actions = [
    {
      icon: (
        <AcUnitIcon
          onClick={() => {
            setSnow(!snow);
          }}
        />
      ),
      name: "Snow"
    },
    {
      icon: (
        <SettingsIcon
          onClick={() => {
            setCurrentTab("setting");
          }}
        />
      ),
      name: "Setting"
    }
  ];

  return (
    <div className="App">
      <Favicon url={favi} />
      <Helmet>
        <meta charSet="utf-8" />
        <title>{LANG["self_quiz"]}</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
      </Helmet>
      <Router>
        <div className="winter-is-coming">{snow && <Snow />}</div>
        <Redirect to={currentTab} />
        <AppBar data-cy="tabs" position="static" color="default">
          <Tabs
            value={currentTab}
            indicatorColor="primary"
            onChange={(e, v) => setCurrentTab(v)}
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab
              value="create-question"
              id="Tab-create-question"
              label={LANG["make_quiz"]}
            />
            <Tab value="exame" id="Tab-Texame" label={LANG["exame"]} />
            <Tab
              value="manage-question"
              id="Tab-manage-question"
              label={LANG["manage"]}
            />
          </Tabs>
        </AppBar>
        <Container maxWidth="sm">
          <Switch>
            <Route
              path="/create-question"
              render={prop => <CreateQuestion />}
            />
            <Route path="/exame" render={prop => <Exame {...prop} />} />
            <Route
              path="/manage-question"
              render={prop => <ManageQuestion {...prop} />}
            />
            <Route path="/setting" render={prop => <SettingPage {...prop} />} />
          </Switch>
        </Container>

        <SpeedDial
          ariaLabel="More"
          className={floatStyle.speedDial}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction={direction}
        >
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleClose}
            />
          ))}
        </SpeedDial>
      </Router>
    </div>
  );
};

export default App;
