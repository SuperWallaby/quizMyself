import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button
} from "@material-ui/core";
import { LANG } from "../../../App";
import { QExame } from "../../../types/declations";
import { DB } from "../../../helps";
import { veritcalWrapStyle } from "../../createQuestion/style";

interface IProps {
  data: QExame[];
}

const ExameEndView: React.FC<IProps> = ({ data }) => {
  const wrapClasses = veritcalWrapStyle();
  const dataLength = data.length;
  const solvedCount = data.filter(d => d.testResult).length;
  const ratioSolved = solvedCount / dataLength;
  const ratioSolvedString = `${solvedCount}/${dataLength} `;

  for (const d of data) {
    if (d.solve === undefined) {
      d.data.priority++;
      DB?.put("question", d.data);
    }
  }

  let emoji = "😭";
  if (ratioSolved > 0.33) emoji = "😢";
  if (ratioSolved > 0.66) emoji = "🙂";
  if (ratioSolved > 0.99) emoji = "😆";

  let titleMessage = LANG["check_right_answer"];

  if (ratioSolved === 1) titleMessage = LANG["It_is_perfect"];

  return (
    <div className={wrapClasses.root}>
      <h2>
        {titleMessage}
        {` ${emoji}`}
      </h2>
      <TableContainer className={wrapClasses.space3} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{LANG["index"]}</TableCell>
              <TableCell align="center">{LANG["quiz"]}</TableCell>
              <TableCell align="right">{LANG["right_answer"]}</TableCell>
              <TableCell align="right">{ratioSolvedString} </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d, i) => {
              const { data, testResult } = d;
              const { id, question, answer } = data;
              return (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell
                    style={{
                      maxWidth: 130
                    }}
                    align="center"
                  >
                    {question}
                  </TableCell>
                  <TableCell align="right">{answer}</TableCell>
                  <TableCell align="right">
                    {testResult ? "⭕" : "❌"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        onClick={() => {
          window.location.reload();
        }}
        size="large"
        variant="contained"
        color="secondary"
      >
        {LANG["retry"]}
      </Button>
    </div>
  );
};

export default ExameEndView;
