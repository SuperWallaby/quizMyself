import React, { useState } from "react";
import {
  TextField,
  Button,
  makeStyles,
  Card,
  CardContent,
  Snackbar
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { DB } from "../helps";
import { QuestionCreate, AppInfo } from "../types/declations";
import { defulatToastStatus } from "../types/default";
import { LANG } from "../App";

function Alert(props: any) {
  return <MuiAlert elevation={6} {...props} />;
}

interface IProps {}

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      marginLeft: 0,
      marginRight: 0,
      width: "100%"
    }
  },
  space1: {
    marginBottom: theme.spacing(3)
  }
}));

export const veritcalWrapStyle = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(6)
  }
}));

const CreateQuestion: React.FC<IProps> = () => {
  const wrapCalsses = veritcalWrapStyle();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  const [toastOpen, setToastOpen] = useState(defulatToastStatus);
  const [question, setQuestion] = useState<QuestionCreate>({
    question: "",
    answer: "",
    date: new Date()
  });

  const appInfoString = localStorage.getItem("appInfo");
  const appInfo: AppInfo | null = appInfoString
    ? JSON.parse(appInfoString)
    : null;

  if (!appInfo) {
    localStorage.setItem(
      "appInfo",
      JSON.stringify({
        needGuid: true
      })
    );
    setToastOpen({
      ...toastOpen,
      guid: true
    });
  }

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setToastOpen(defulatToastStatus);
  };

  const handleClickAdd = () => {
    if (!question.answer || !question.answer) {
      setToastOpen({
        guid: false,
        remember: false,
        fail: true,
        sucess: false
      });

      return;
    }
    DB!
      .add("question", question)
      .catch(e => {
        setToastOpen({
          ...defulatToastStatus,
          fail: true
        });
      })
      .then(v => {
        if (appInfo?.needGuid) {
          setToastOpen({
            ...toastOpen,
            remember: true
          });
          appInfo.needGuid = false;
          localStorage.setItem("appInfo", JSON.stringify(appInfo));
        } else if (toastOpen.sucess) {
          // 켜져 있으면 껏다가 켜는 용도
          setToastOpen(defulatToastStatus);
          setTimeout(() => {
            setToastOpen({
              ...defulatToastStatus,
              sucess: true
            });
          }, 100);
        } else {
          setToastOpen({
            ...defulatToastStatus,
            sucess: true
          });
        }
      })
      .finally(() => {
        setQuestion({
          answer: "",
          question: "",
          date: new Date()
        });
        setLoading(true);
      });
  };

  return (
    <div className={wrapCalsses.root}>
      <h1>{LANG["create_some_quiz"]}</h1>

      <Card className={classes.space1}>
        <form className={classes.root} noValidate autoComplete="off">
          <CardContent>
            <div>
              <TextField
                id="outlined-basic"
                onChange={e => {
                  setQuestion({ ...question, question: e.currentTarget.value });
                }}
                value={question.question}
                label={LANG["question"]}
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                onChange={e => {
                  setQuestion({ ...question, answer: e.currentTarget.value });
                }}
                value={question.answer}
                id="outlined-basic"
                label={LANG["answer"]}
                variant="outlined"
              />
            </div>{" "}
          </CardContent>
        </form>
      </Card>
      <Button
        onClick={handleClickAdd}
        size="large"
        variant="contained"
        color="primary"
      >
        {LANG["add"]}
      </Button>
      <Snackbar
        open={toastOpen.sucess}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          {LANG["Added_to_quiz_list"]}
        </Alert>
      </Snackbar>
      <Snackbar
        open={toastOpen.fail}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {LANG["Can_not_added_to_quiz_list"]}
        </Alert>
      </Snackbar>
      <Snackbar
        open={toastOpen.guid}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="info">
          💌 {LANG["Hope_this_app_help_your_learning"]}
        </Alert>
      </Snackbar>
      <Snackbar
        open={toastOpen.remember}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="info">
          {LANG["will_remember_quiz"]} 😊
        </Alert>
      </Snackbar>
      {/* 
      <div className={wrapCalsses.root}>
        <EnhancedTable data={data} />1
      </div> */}
    </div>
  );
};

export default CreateQuestion;
