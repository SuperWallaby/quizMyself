import { Question, QExame } from "./declations";
import { TtempOption } from "./declations";
import { LANG } from "../App";

export const defulatToastStatus = {
  sucess: false,
  fail: false,
  guid: false,
  remember: false
};

export const defaultQuiz: Question = {
  question: "",
  answer: "",
  date: new Date(),
  explain: "",
  id: 0,
  priority: 10,
  customHint: "",
  type: "essayQ"
};

export const defaultOp: TtempOption = {
  checked: false,
  op: ""
};
