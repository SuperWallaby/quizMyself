import React, { useState } from "react";
import {
  TextField,
  useTheme,
  makeStyles,
  MobileStepper,
  Button,
  Card,
  CardContent,
  Snackbar,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { QExame } from "../../types/declations";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import { veritcalWrapStyle } from "../CreateQuestion";
import { DB, shuffle } from "../../helps";
import TempAlert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import "./Exame.scss";
import { LANG } from "../../App";

function Alert(props: any) {
  return <TempAlert elevation={6} {...props} />;
}

const formStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1)
    }
  }
}));

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  space1: {
    marginBottom: theme.spacing(3)
  }
}));

interface IProps {}

const Exame: React.FC<IProps> = () => {
  const DefaultQExame: QExame = {
    question: LANG["answer_is_sample"],
    answer: LANG["sample"],
    date: new Date(),
    solved: false,
    id: -1
  };

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<QExame[]>([DefaultQExame]);
  const [toastOpen, setToastOpen] = useState({
    sucess: false,
    fail: false
  });
  const [isFinish, setIsFinish] = useState(false);
  const wrapClasses = veritcalWrapStyle();
  const [expect, setExpect] = useState("");
  const classes = useStyles();
  const formClass = formStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    setToastOpen({
      fail: false,
      sucess: false
    });
  };

  let tempData: any[] = [];

  if (loading) {
    (async () => {
      let cursor = await DB?.transaction("question").store.openCursor();
      while (cursor) {
        tempData.push(cursor.value);
        cursor = await cursor.continue();
      }
    })().finally(() => {
      setData(tempData.length ? shuffle(tempData) : [DefaultQExame]);
      setLoading(false);
    });
  }

  const checkValue = () => {
    if (!data[activeStep]) {
      throw new Error(
        `data 안에 ${activeStep} 번쨰 데이터는 존재하지 않습니다.`
      );
    }

    const rightAnswer = data[activeStep].answer;
    const filteredExpect = expect.toLowerCase().trim();
    return (
      filteredExpect === rightAnswer ||
      filteredExpect === rightAnswer.toLowerCase()
    );
  };

  const handleSubmit = (e: any) => {
    if (checkValue()) {
      data[activeStep].solved = true;
      setData([...data]);
      if (isLastStep) {
        setIsFinish(true);
      } else {
        setActiveStep(activeStep + 1);
      }
      setToastOpen({ fail: false, sucess: true });
    } else {
      setToastOpen({ fail: true, sucess: false });
    }
  };

  const dataLength = data.length;
  const isLastStep = activeStep === dataLength - 1;

  const handleNext = () => {
    if (isLastStep) {
      setIsFinish(true);
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  if (isFinish) {
    const solvedCount = data.filter(d => d.solved).length;
    const ratioSolved = solvedCount / dataLength;
    const ratioSolvedString = `${solvedCount} / ${dataLength} `;
    let emoji = "😭";
    if (ratioSolved > 0.33) emoji = "😢";
    if (ratioSolved > 0.66) emoji = "🙂";
    if (ratioSolved > 0.99) emoji = "😆";

    let titleMessage = LANG["check_right_answer"];

    if (ratioSolved === 1) titleMessage = LANG["It_is_perfect"];

    return (
      <div className={wrapClasses.root}>
        <h1>{titleMessage}</h1>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{LANG["index"]}</TableCell>
                <TableCell align="center">{LANG["quiz"]}</TableCell>
                <TableCell align="right">{LANG["right_answer"]}</TableCell>
                <TableCell align="right">
                  {ratioSolvedString + emoji}{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((d, i) => (
                <TableRow key={d.id}>
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell
                    style={{
                      maxWidth: 130
                    }}
                    align="center"
                  >
                    {d.question}
                  </TableCell>
                  <TableCell align="right">{d.answer}</TableCell>
                  <TableCell align="right">{d.solved ? "⭕" : "❌"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }

  let stepper = "dots";
  if (dataLength > 10) stepper = "text";
  if (dataLength > 100) stepper = "progress";

  return (
    <div className={wrapClasses.root}>
      <h1>{LANG["lets_solve_quiz"]}</h1>
      <Card className={classes.space1}>
        <MobileStepper
          variant={stepper as any}
          steps={dataLength}
          position="static"
          activeStep={activeStep}
          className={classes.root}
          nextButton={
            <Button size="small" onClick={handleNext}>
              {isLastStep ? "Finish" : "Skip"}
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
        <CardContent>
          <div>
            <h1>{data[activeStep].question}</h1>
            <form className={formClass.root}>
              <TextField
                onChange={e => {
                  setExpect(e.currentTarget.value);
                }}
                value={expect}
                id="outlined-basic"
                label={LANG["answer"]}
                variant="outlined"
              />
            </form>
          </div>
        </CardContent>
      </Card>
      <Button
        onClick={handleSubmit}
        size="large"
        variant="contained"
        color="primary"
      >
        {LANG["submit"]}
      </Button>
      <Snackbar
        open={toastOpen.sucess}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          {LANG["it_is_right_answer"]} 😊
        </Alert>
      </Snackbar>
      <Snackbar
        open={toastOpen.fail}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {LANG["it_is_wrong_answer"]} 🤔
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Exame;
