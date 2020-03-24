import React from "react";
import { Snackbar, SnackbarProps } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

function Alert(props: any) {
  return <MuiAlert elevation={6} {...props} />;
}

export interface IToastProps extends SnackbarProps {
  alertProp?: AlertProps;
}

const Toast: React.FC<IToastProps> = ({ children, alertProp, ...props }) => {
  return (
    <Snackbar data-cy="snackBar" {...props}>
      <Alert onClose={props.onClose} {...alertProp}>
        {children}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
