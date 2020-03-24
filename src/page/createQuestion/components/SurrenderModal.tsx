import React from "react";
import { useModal, IUseModal } from "../../../hooks/hook";
import {
  Button,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Slide
} from "@material-ui/core";
import { LANG } from "../../../App";
import { TransitionProps } from "@material-ui/core/transitions";

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

export type TSurrenderModalInfo = {
  title: JSX.Element;
  Commentary?: JSX.Element;
};

interface IProps {
  modalHook: IUseModal<TSurrenderModalInfo>;
  handleClickNextBtn: () => any;
}

const SurrenderModal: React.FC<IProps> = ({
  modalHook,
  handleClickNextBtn
}) => {
  const { open, closeModal, info } = modalHook;

  if (!info) return <div />;

  const { title, Commentary } = info;

  const handleClickNext = () => {
    modalHook.closeModal();
    handleClickNextBtn();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={closeModal}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        {Commentary && (
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {Commentary}
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClickNext} color="primary">
            {LANG["go_to_next_quiz"]} 👉
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SurrenderModal;
