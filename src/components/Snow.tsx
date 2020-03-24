import "./Snow.scss";
import React, { useEffect, Fragment } from "react";

interface IProps {}

const Snow: React.FC<IProps> = () => {
  useEffect(() => {
    document.getElementById("root")?.classList.add("root--snow");
    return () => {
      document.getElementById("root")?.classList.remove("root--snow");
    };
  });

  return (
    <Fragment>
      <div className="snow snow--near"></div>
      <div className="snow snow--near snow--alt"></div>

      <div className="snow snow--mid"></div>
      <div className="snow snow--mid snow--alt"></div>

      <div className="snow snow--far"></div>
      <div className="snow snow--far snow--alt"></div>
    </Fragment>
  );
};

export default Snow;
