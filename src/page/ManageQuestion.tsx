import React, { useState } from "react";
import QuestionList from "../components/QuestionList";
import { MyDB } from "../types/declations";
import { DB } from "../helps";
import { Button } from "@material-ui/core";
import { wrap, unwrap } from "idb";
import { LANG } from "../App";
import { veritcalWrapStyle } from "./createQuestion/style";

interface IProps {}

const ManageQuestion: React.FC<IProps> = () => {
  const wrapCalsses = veritcalWrapStyle();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<null | MyDB["question"]["value"][]>(null);
  const [selected, setSelected] = React.useState<any[]>([]);
  console.log("selected");
  console.log(selected);
  // DB?.getAll("question")
  //   .then(v => {
  //     setData(v.reverse());
  //   })
  //   .catch(e => {
  //     console.error(e);
  //   })
  //   .finally(() => {
  //     setLoading(false);
  //   });

  let tempData: any[] = [];

  if (loading) {
    (async () => {
      let cursor = await DB?.transaction("question").store.openCursor();
      while (cursor) {
        tempData.push(cursor.value);
        cursor = await cursor.continue();
      }
    })().finally(() => {
      setData(tempData);
      setLoading(false);
    });
  }

  const handleDeleteBtn = () => {
    const requests = selected.map(id => DB?.delete("question", id));
    Promise.all(requests)
      .catch(e => console.error(e))
      .finally(() => {
        setLoading(true);
      });
  };

  return (
    <div className={wrapCalsses.root}>
      <h2>{LANG["do_manage_quiz"]}</h2>

      <div>
        <QuestionList
          setSelected={setSelected}
          selected={selected}
          withSelect
          data={data}
        />
      </div>
      <Button
        onClick={handleDeleteBtn}
        color="secondary"
        size="medium"
        variant="contained"
      >
        {LANG["delete"]}
      </Button>
    </div>
  );
};

export default ManageQuestion;
