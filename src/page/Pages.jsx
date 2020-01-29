import React from "react";
import DynamicImport from "../utils/dynamicComponent";
import CircularProgress from "@material-ui/core/CircularProgress";

export const CreateQuestion = props => (
  <DynamicImport load={() => import("./CreateQuestion")}>
    {DNcompoent =>
      DNcompoent === null ? (
        <CircularProgress variant="determinate" />
      ) : (
        <DNcompoent {...props} />
      )
    }
  </DynamicImport>
);

export const Exame = props => (
  <DynamicImport load={() => import("./exame/Exame")}>
    {DNcompoent =>
      DNcompoent === null ? (
        <CircularProgress variant="determinate" />
      ) : (
        <DNcompoent {...props} />
      )
    }
  </DynamicImport>
);

export const ManageQuestion = props => (
  <DynamicImport load={() => import("./ManageQuestion")}>
    {DNcompoent =>
      DNcompoent === null ? (
        <CircularProgress variant="determinate" />
      ) : (
        <DNcompoent {...props} />
      )
    }
  </DynamicImport>
);
