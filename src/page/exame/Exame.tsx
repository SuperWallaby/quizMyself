import React, { useState, useMemo, Fragment } from "react";
import {
  TextField,
  useTheme,
  makeStyles,
  MobileStepper,
  Button,
  Card,
  CardContent,
  Snackbar,
  IconButton,
  CardActions,
  Popover,
  Typography,
  Tooltip,
  createStyles,
  Theme
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { QExame } from "../../types/declations";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import "./Exame.scss";
import { LANG } from "../../App";
import ExameEndView from "./components/ExameEndView";
import LinearBuffer from "../../components/progress/Progress";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import {
  DefaultQuest,
  checkValue,
  loadData,
  getHandlers,
  Exame as classExame
} from "./helper";
import { useModal, useToast } from "../../hooks/hook";
import SurrenderModal, {
  TSurrenderModalInfo
} from "../createQuestion/components/SurrenderModal";
import { formStyles, useStyles } from "./Styles";
import { TExameContext } from "./declation";
import { veritcalWrapStyle, ExpendButtonStyle } from "../createQuestion/style";
import OptionsSelecter from "./components/OptionsSelecter";
import Hint from "./components/Hint";
import DetailAct from "./components/DetailAct";
import Toast from "../../atom/Toast";

export const exameStyle = makeStyles(theme => ({
  exame: {
    "& .typography": {
      padding: theme.spacing(1)
    }
  }
}));
interface IProps {}

const Exame: React.FC<IProps> = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<QExame[]>([new classExame(DefaultQuest)]);
  const { toastHandle, toastOps } = useToast();
  const surrenderModalHook = useModal<TSurrenderModalInfo>();
  const [detailMode, setDetailMode] = useState(false);
  const [hint, setHint] = useState("");
  const [activeStep, setActiveStep] = React.useState(0);
  const [isFinish, setIsFinish] = useState(false);
  const [expect, setExpect] = useState("");
  const exameStlyes = exameStyle();
  const wrapClasses = veritcalWrapStyle();
  const classes = useStyles();
  const formClass = formStyles();
  const theme = useTheme();

  const dataLength = data.length;
  const isLastStep = activeStep === dataLength - 1;
  const currentQuiz = data[activeStep];

  const DataCounts = useMemo(() => {
    let countLost: number = 0;
    let countCorrect: number = 0;
    let countSkipd: number = 0;
    data.forEach(d => {
      if (d.testResult) countLost++;
    });
    countSkipd = activeStep - countCorrect - countLost;
    return {
      countSkipd,
      countCorrect,
      countLost
    };
  }, [data, activeStep]);

  const exameContext: TExameContext = {
    data,
    setData,
    surrenderModalHook,
    setHint,
    isLastStep,
    expect,
    isFinish,
    activeStep,
    currentQuiz,
    hint,
    detailMode,
    setDetailMode,
    setActiveStep,
    setIsFinish,
    setExpect,
    toastHandle,
    toastOps
  };

  const {
    handleBack,
    handleCloseSnack,
    handleNext,
    handleSubmit,
    handleClickNextBtn,
    handleOpenSurrenderModal
  } = getHandlers(exameContext);

  if (loading) {
    loadData(setLoading, setData);
  }

  if (loading)
    return (
      <div>
        <LinearBuffer />
      </div>
    );

  const {
    img,
    id: currentId,
    date,
    priority,
    question,
    answer,
    customHint,
    smallQuestion,
    lastSolve,
    explain,
    type,
    options
  } = currentQuiz.data;

  let imgURL = "";
  if (img) {
    imgURL = URL.createObjectURL(img);
    // URL.revokeObjectURL(imgURL);
  }

  let stepper = "dots";

  if (dataLength > 10) stepper = "text";
  if (dataLength > 100) stepper = "progress";
  if (isFinish) return <ExameEndView data={data} />;

  const { countCorrect, countSkipd, countLost } = DataCounts;
  return (
    <div className={wrapClasses.root}>
      <div className={exameStlyes.exame}>
        <h3>
          {activeStep
            ? `😊 ${countCorrect} 😓 ${countLost} ❔ ${countSkipd}`
            : LANG["fisrt_quiz"]}
        </h3>
        <Card className={classes.space3}>
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
              <h2>{question}</h2>
              {imgURL && <img src={imgURL} />}
              <Hint hint={hint} />
              <form className={formClass.root}>
                <Fragment>
                  {type === "essayQ" && (
                    <TextField
                      onChange={e => {
                        setExpect(e.currentTarget.value);
                      }}
                      value={expect}
                      id="outlined-basic"
                      label={LANG["answer"]}
                      variant="outlined"
                    />
                  )}
                </Fragment>
              </form>
              {type === "multipleQ" && (
                <OptionsSelecter
                  setExpect={setExpect}
                  expect={expect}
                  options={options || []}
                />
              )}
            </div>
          </CardContent>
          {detailMode && (
            <DetailAct
              handleOpenSurrenderModal={handleOpenSurrenderModal}
              exameContext={exameContext}
            />
          )}
          <div>
            <Button
              style={ExpendButtonStyle}
              size="large"
              onClick={() => {
                setDetailMode(!detailMode);
              }}
            >
              {detailMode ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
          </div>
        </Card>
        <Button
          onClick={handleSubmit}
          size="large"
          variant="contained"
          color="primary"
        >
          {LANG["submit"]}
        </Button>
        <SurrenderModal
          handleClickNextBtn={handleClickNextBtn}
          modalHook={surrenderModalHook}
        />
        <Toast open={false} {...toastOps} />
      </div>
    </div>
  );
};

export default Exame;
