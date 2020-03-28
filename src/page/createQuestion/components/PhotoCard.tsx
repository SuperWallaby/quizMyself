import DeleteIcon from "@material-ui/icons/Delete";
import { Theme, IconButton } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core";
import React from "react";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    photoCard: {
      border: `1px solid ${theme.palette.grey[100]}`,
      padding: theme.spacing(1),
      width: "auto",
      height: theme.spacing(10),
      position: "relative",
      "&:hover .deleteIcon": {
        display: "block"
      },
      "& .deleteIcon": {
        position: "absolute",
        backgroundColor: "white",
        boxShadow: theme.shadows[1],
        top: theme.spacing(-1),
        right: theme.spacing(-1),
        display: "none"
      }
    }
  })
);

interface IProps {
  imgURL: string;
  handleDelete: () => void;
}

const PhotoCard: React.FC<IProps> = ({ imgURL, handleDelete }) => {
  const { photoCard } = useStyle();

  return (
    <div className={photoCard}>
      <IconButton
        onClick={handleDelete}
        size="small"
        color="secondary"
        aria-label="delete"
        className="deleteIcon"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
      <img
        style={{
          maxWidth: "100%",
          maxHeight: "100%"
        }}
        src={imgURL}
      />
    </div>
  );
};

export default PhotoCard;
