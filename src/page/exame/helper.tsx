import React from "react";
import { shuffle, DB } from "../../helps";
import { Question } from "../../types/declations";
import { LANG } from "../../App";
import { QExame } from "../../types/declations";
import { TExameContext } from "./declation";

export class Exame implements QExame {
  public data: Question;
  public testResult = false;

  constructor(prop: Question) {
    this.data = prop;
  }

  public solve = async () => {
    this.data.priority--;
    this.testResult = true;
    this.data.lastSolve = new Date();

    DB?.put("question", this.data);
  };

  public surrender = async () => {
    this.data.priority++;
    this.testResult = false;
    DB?.put("question", this.data);
  };
}

export const DefaultQuest: Question = {
  type: "essayQ",
  priority: 10,
  question: LANG["answer_is_sample"],
  answer: LANG["sample"],
  date: new Date(),
  id: -1
};

export const loadData = (setLoading: any, setData: any) => {
  let tempData: Question[] = [];

  (async () => {
    let cursor = await DB?.transaction("question").store.openCursor();
    while (cursor) {
      tempData.push(cursor.value);
      cursor = await cursor.continue();
    }
  })().finally(() => {
    const sortMethod = localStorage.getItem("exam-method") || "ai";
    const setCount = parseInt(localStorage.getItem("exam-count") || "") || 1000;
    let viewData = tempData.length ? tempData : [DefaultQuest];

    if (sortMethod === "ai") {
      viewData.sort((d1, d2) => d2.priority - d1.priority);
    } else if (sortMethod === "random") {
      viewData = shuffle(tempData);
    }

    const filteredViewData = viewData.slice(0, setCount - 1);
    setData(filteredViewData.map(d => new Exame(d)));
    setLoading(false);
  });
};

export const checkValue = (
  expect: string,
  data: QExame[],
  activeStep: number
) => {
  if (!data[activeStep]) {
    throw new Error(`data 안에 ${activeStep} 번쨰 데이터는 존재하지 않습니다.`);
  }
  const rightAnswer = data[activeStep].data.answer;
  const filteredExpect = expect.toLowerCase().trim();
  return (
    filteredExpect === rightAnswer ||
    filteredExpect === rightAnswer.toLowerCase()
  );
};

export const getHandlers = (prop: TExameContext) => {
  const {
    activeStep,
    surrenderModalHook,
    data,
    setData,
    currentQuiz,
    isLastStep,
    setHint,
    detailMode,
    expect,
    hint,
    isFinish,
    setActiveStep,
    toastHandle,
    setDetailMode,
    setExpect,
    setIsFinish
  } = prop;

  const handleCloseSnack = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    toastHandle({
      open: false
    });
  };

  const handleSubmit = (e: any) => {
    const isAccurate = checkValue(expect, data, activeStep);

    if (!isAccurate) {
      toastHandle({
        open: true,
        children: `${LANG["it_is_wrong_answer"]} 🤔`,
        alertProp: {
          severity: "error"
        }
      });

      if (currentQuiz.data.type === "multipleQ") {
        oepnSurrenderModal();
      }
      return;
    }

    currentQuiz.solve().then(() => {
      setData([...data]);
    });

    toastHandle({
      open: true,
      children: `${LANG["it_is_right_answer"]} 😊`,
      alertProp: {
        severity: "success"
      }
    });

    if (isLastStep) setIsFinish(true);
    else setActiveStep(activeStep + 1);
  };

  const handleStepChange = () => {
    setHint("");
    setExpect("");
  };

  const handleNext = () => {
    handleStepChange();
    if (!isLastStep) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
      return;
    }
    setIsFinish(true);
  };

  const handleBack = () => {
    handleStepChange();
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleClickNextBtn = () => {
    handleNext();
  };

  const oepnSurrenderModal = () => {
    const { explain, answer, type, options } = currentQuiz.data;
    // let index = "";
    // if (options) {
    //   index = (
    //     options.findIndex(
    //       op => op.toLowerCase().trim() === answer.toLowerCase().trim()
    //     ) + 1
    //   ).toString();
    // }
    surrenderModalHook.openModal({
      title: (
        <div>
          <h5>🙄 {LANG["answer_is_xxx"]}</h5>
          <h3>{answer}</h3>
        </div>
      ),
      Commentary: explain ? <span>{explain}</span> : undefined
    });
  };

  const handleOpenSurrenderModal = () => {
    currentQuiz.surrender().then(() => {
      setData([...data]);
    });
    oepnSurrenderModal();
  };

  return {
    handleOpenSurrenderModal,
    handleClickNextBtn,
    handleCloseSnack,
    handleSubmit,
    handleBack,
    handleNext
  };
};
