import React, { useState, useRef, Fragment, useEffect } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { DB } from "../../helps";
import {
  Question,
  AppInfo,
  TquizType,
  TtempOption
} from "../../types/declations";
import {
  defulatToastStatus,
  defaultQuiz,
  defaultOp
} from "../../types/default";
import { LANG } from "../../App";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
// @ts-ignore 타입이 존재하지않는 모듈
import Resizer from "react-image-file-resizer";
import { imgValidate, removeSpecialChar } from "../../utils/validate";
import HeaderSoter from "./components/HeadSorter";
import { getAppInfo } from "./helper";
// import CreateQuizToasts from "./Toasts";
import { veritcalWrapStyle, useStyles, ExpendButtonStyle } from "./style";
import Qoption from "./components/Qoption";
import { useToast } from "../../hooks/hook";
import Toast from "../../atom/Toast";
import Card from "@material-ui/core/Card/Card";
import TextField from "@material-ui/core/TextField/TextField";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid";
import PhotoCard from "./components/PhotoCard";

interface IProps {}

const CreateQuestion: React.FC<IProps> = () => {
  const wrapCalsses = veritcalWrapStyle();
  const classes = useStyles();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(true);
  const [detailMode, setDetailMode] = useState(false);
  const [question, setQuestion] = useState<Question>(defaultQuiz);
  const [format, setformat] = React.useState<TquizType>("essayQ");
  const [options, setOptions] = useState<TtempOption[]>([defaultOp]);
  const { toastHandle, toastOps } = useToast();

  const handleDeleteBtnClick = (i: number) => {
    question.img?.splice(i, 1);
    setQuestion({ ...question });
  };

  const handleClickOptionDelete = (i: number) => {
    options.splice(i, 1);
    setOptions([...options]);
  };

  const handleClickOptionCircle = (op: TtempOption) => {
    const tempCheck = !op.checked;
    options.forEach(op => {
      op.checked = false;
    });
    op.checked = tempCheck;
    setOptions([...options]);
  };

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newformat: string[]
  ) => {
    if (!format) return;
    const filterd = newformat.filter(f => f !== format);
    if (filterd.length !== 0) setformat(filterd[0] as TquizType);
  };

  const validater = () => {
    if (question.type === "essayQ") {
      return question.answer && question.question;
    } else {
      return Boolean(question.options && question.question);
    }
  };

  const validateFailAction = () => {
    return;
  };

  const appInfo = getAppInfo();

  useEffect(() => {
    const { needGuid } = appInfo;
    if (needGuid) {
      toastHandle({
        children: `💌 ${LANG["Hope_this_app_help_your_learning"]}`,
        open: needGuid,
        alertProp: {
          severity: "info"
        }
      });
    }
  }, []);

  useEffect(() => {
    setQuestion({ ...defaultQuiz });
  }, [format]);

  const guidMessage = () => {
    toastHandle({
      children: `${LANG["will_remember_quiz"]} 😊`,
      open: true,
      alertProp: {
        severity: "info"
      }
    });
    if (appInfo) {
      appInfo.needGuid = false;
      localStorage.setItem("appInfo", JSON.stringify(appInfo));
    }
  };

  const toastQuestionAddResult = (sucess: boolean) => {
    if (appInfo?.needGuid) {
      guidMessage();
    } else if (sucess) {
      toastHandle({
        children: `${LANG["Added_to_quiz_list"]}`,
        open: true,
        autoHideDuration: 2000,
        alertProp: {
          severity: "success"
        }
      });
    } else {
      toastHandle({
        children: `${LANG["Can_not_added_to_quiz_list"]} 😫`,
        open: true,
        autoHideDuration: 3000,
        alertProp: {
          severity: "error"
        }
      });
    }
  };

  const handleClickAdd = () => {
    if (!validater()) {
      toastQuestionAddResult(false);
    }

    delete question.id;
    question.type = format;
    const optionValues = options.map(op => op.op);
    const checkedOptions = options.filter(op => op.checked).map(op => op.op);
    question.options = optionValues;
    if (question.type === "multipleQ") question.answer = checkedOptions[0];

    DB!
      .add("question", question)
      .then(v => {
        toastQuestionAddResult(true);
      })
      .catch(e => {
        toastQuestionAddResult(false);
      })
      .finally(() => {
        setQuestion(defaultQuiz);
        setOptions([
          {
            checked: false,
            op: ""
          }
        ]);
        setFileName("");
        setLoading(true);
      });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    if (!e) return;
    if (!imgValidate(e)) return;
    const file: any = e.target!.files![0];
    Resizer.imageFileResizer(
      file,
      400,
      600,
      "JPEG",
      80,
      0,
      async (blob: Blob) => {
        question.img = question.img ? [...question.img, blob] : [blob];
        setFileName(removeSpecialChar(file.name));
        setQuestion({
          ...question,
          img: question.img
        });
      },
      "blob"
    );
  };

  return (
    <div className={wrapCalsses.root}>
      <h2>{LANG["create_some_quiz"]}</h2>
      <HeaderSoter
        wrapCalsses={wrapCalsses}
        format={format}
        handleFormat={handleFormat}
      />
      <Card className={classes.card}>
        <form className={classes.root} noValidate autoComplete="off">
          <CardContent>
            {format === "essayQ" && (
              <Fragment>
                <div>
                  <TextField
                    multiline
                    id="outlined-basic"
                    data-cy="essayI"
                    onChange={e => {
                      setQuestion({
                        ...question,
                        question: e.currentTarget.value
                      });
                    }}
                    value={question.question}
                    label={LANG["question"]}
                    variant="outlined"
                  />
                </div>
                <div>
                  <TextField
                    onChange={e => {
                      setQuestion({
                        ...question,
                        answer: e.currentTarget.value
                      });
                    }}
                    data-cy="answerI"
                    value={question.answer}
                    id="outlined-basic"
                    label={LANG["answer"]}
                    variant="outlined"
                  />
                </div>
              </Fragment>
            )}
            {format === "multipleQ" && (
              <Fragment>
                <div>
                  <TextField
                    multiline
                    data-cy="multipleI"
                    id="outlined-basic"
                    onChange={e => {
                      setQuestion({
                        ...question,
                        question: e.currentTarget.value
                      });
                    }}
                    value={question.question}
                    label={LANG["question"]}
                    variant="outlined"
                  />
                </div>
                {options.map((op, i) => (
                  <Qoption
                    key={i}
                    options={options}
                    setOptions={setOptions}
                    onClickOptionDelete={handleClickOptionDelete}
                    onClickOptionCircle={handleClickOptionCircle}
                    classes={classes}
                    op={op}
                    index={i}
                  />
                ))}
                <Button
                  data-cy="addOptionB"
                  className="optionAddBtn"
                  onClick={() => {
                    setOptions([...options, { checked: false, op: "" }]);
                  }}
                  variant="outlined"
                  size="large"
                >
                  {LANG["add"]}
                </Button>
              </Fragment>
            )}
            {detailMode && (
              <Fragment>
                <div className="fileUploader">
                  <input
                    data-cy="fileUploader"
                    onChange={handleFileChange}
                    ref={imageInputRef}
                    style={{
                      position: "absolute",
                      width: "1px",
                      opacity: 0,
                      height: "1px"
                    }}
                    type="file"
                  />
                  {/* 커스텀 힌트 */}
                  <TextField
                    id="outlined-basic"
                    data-cy="customHint"
                    multiline
                    onChange={e => {
                      setQuestion({
                        ...question,
                        customHint: e.currentTarget.value
                      });
                    }}
                    value={question.customHint}
                    label={LANG["custom_hint"]}
                    variant="outlined"
                  />
                  {/* 해설 */}
                  <TextField
                    data-cy="describe"
                    id="outlined-basic"
                    multiline
                    onChange={e => {
                      setQuestion({
                        ...question,
                        explain: e.currentTarget.value
                      });
                    }}
                    value={question.explain}
                    label={LANG["explane_about_answer"]}
                    variant="outlined"
                  />
                  {/* 이미지추가 */}
                  <Button
                    className="addImgBtn"
                    variant="outlined"
                    color="primary"
                    endIcon={<AddAPhotoIcon />}
                    onClick={() => {
                      console.log(imageInputRef.current);
                      imageInputRef.current?.click();
                    }}
                  >
                    {LANG["add_img"]}
                  </Button>
                </div>
                <div>
                  <Grid wrap="wrap" container spacing={1}>
                    {question.img?.map((blobImg, i) => {
                      const handleDeleteBtn = handleDeleteBtnClick.bind(
                        handleDeleteBtnClick,
                        i
                      );
                      const imgURL = URL.createObjectURL(blobImg);
                      return (
                        <Grid xs={3} key={i} item>
                          <PhotoCard
                            handleDelete={handleDeleteBtn}
                            imgURL={imgURL}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                </div>
              </Fragment>
            )}
          </CardContent>
          <div>
            <Button
              className="lastBtn"
              data-cy="pendB"
              data-open={detailMode ? "true" : "false"}
              style={ExpendButtonStyle}
              size="large"
              onClick={() => {
                setDetailMode(!detailMode);
              }}
            >
              {detailMode ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Button>
          </div>
        </form>
      </Card>
      <Button
        data-cy="addB"
        onClick={handleClickAdd}
        size="large"
        variant="contained"
        color="primary"
      >
        {LANG["add"]}
      </Button>
      {/* <CreateQuizToasts toastOpen={toastOpen} handleClose={handleClose} /> */}
      <Toast open={false} {...toastOps} />
    </div>
  );
};

export default CreateQuestion;
