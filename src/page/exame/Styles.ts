import { makeStyles } from "@material-ui/core";

export const formStyles = makeStyles(theme => ({
    root: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1)
        },
        "& .popOver": {
            padding: theme.spacing(1)
        }
    }
}));

export const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    space3: {
        marginBottom: theme.spacing(3)
    }
}));

