import React, { Fragment } from "react";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";

import ErrorIcon from "@material-ui/icons/Error";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";

import {
  CardActions,
  Tooltip,
  IconButton,
  Popover,
  Typography
} from "@material-ui/core";
import { TExameContext } from "../declation";
import { getHint } from "../../../helps";

interface IProps {
  exameContext: TExameContext;
  handleOpenSurrenderModal: () => void;
}

const DetailAct: React.FC<IProps> = ({
  exameContext,
  handleOpenSurrenderModal
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClosePopOver = () => {
    setAnchorEl(null);
  };

  const handleCustomHintClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const {
    hint,
    data,
    activeStep,
    setHint,
    setExpect,
    currentQuiz
  } = exameContext;
  const { customHint } = currentQuiz.data;

  const showHint = () => {
    const hintString = getHint(data, activeStep);
    setHint(hintString);
    setExpect("");
  };

  return (
    <CardActions disableSpacing>
      {/* 힌트 */}
      <Tooltip title="Hint">
        <IconButton
          aria-label="Show Hint"
          color={hint ? "inherit" : "default"}
          onClick={() => {
            showHint();
          }}
        >
          <LiveHelpIcon />
        </IconButton>
      </Tooltip>
      {/* 커스텀 힌트 */}
      {customHint && (
        <Fragment>
          <Tooltip title="CustomHint">
            <IconButton
              aria-label="Show custom hint"
              onClick={handleCustomHintClick}
              aria-describedby={id}
              color={"default"}
            >
              <ErrorIcon />
            </IconButton>
          </Tooltip>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopOver}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            <Typography
              style={{
                padding: "1rem"
              }}
            >
              {customHint}
            </Typography>
          </Popover>
        </Fragment>
      )}
      {/* 서렌더 */}
      <Tooltip title="Surrender">
        <IconButton
          aria-label="surrender"
          color={hint ? "inherit" : "default"}
          onClick={() => {
            handleOpenSurrenderModal();
          }}
        >
          <EmojiFlagsIcon />
        </IconButton>
      </Tooltip>
    </CardActions>
  );
};

export default DetailAct;
