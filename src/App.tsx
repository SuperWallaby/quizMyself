import React, { useState } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
// @ts-ignore
import detectBrowserLanguage from "detect-browser-language";
import { CreateQuestion, Exame, ManageQuestion } from "./page/Pages";
import { Container, Tabs, AppBar, Tab } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { checkIndexDBsupport, useDB, DB } from "./helps";
import "./App.scss";
import Favicon from "react-favicon";
import favi from "./img/favi.png";
import { en } from "./lang/en";
import { kr } from "./lang/kr";
import { ar } from "./lang/ar";

export let LANG: any = en;

const langSetter = (lang: any) => {
  if (lang === "ko") LANG = kr;
  if (lang === "ar") LANG = ar;
};

const App: React.FC = () => {
  checkIndexDBsupport();
  console.log(detectBrowserLanguage());
  langSetter(detectBrowserLanguage());
  const [currentTab, setCurrentTab] = useState("create-question");
  const { loading } = useDB();

  if (!DB) return <div />;

  return (
    <div className="App">
      <Favicon url={favi} />
      <Helmet>
        <meta charSet="utf-8" />
        <title>{LANG["self_quiz"]}</title>
      </Helmet>
      <Router>
        <Redirect to={currentTab} />
        <AppBar position="static" color="default">
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
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
