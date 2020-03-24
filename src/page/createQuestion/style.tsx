import { makeStyles } from "@material-ui/core";

export const ExpendButtonStyle = {
  width: "100%",
  borderRadius: 0,
  borderTop: "1px solid #ddd"
};

export const useStyles = makeStyles(theme => {
  console.log(theme.palette);
  return {
    root: {
      "& .MuiTextField-root,.fileUploader,.MuiButton-root,.MuiFormControl-root,.optionAddBtn": {
        marginBottom: theme.spacing(2),
        marginLeft: 0,
        marginRight: 0,
        width: "100%"
      },
      "& .lastBtn,.addImgBtn": {
        margin: 0
      }
    },
    card: {
      marginBottom: theme.spacing(3)
    },
    optionFiled: {
      "& .trashCanButton": {
        display: "none"
      },
      "&:hover .trashCanButton": {
        display: "block",
        "&:hover": {
          color: theme.palette.error.main
        }
      },
      "& .checkIcon": {
        color: theme.palette.success.main
      }
    }
  };
});
export const veritcalWrapStyle = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(14)
  },
  space3: {
    marginBottom: theme.spacing(3)
  }
}));
