import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React from "react";

const styles = () => ({
    textField: {
        marginLeft: 10,
        marginRight: 10,
        width: 250,
    },
    button: {
        margin: 10,
    }
});

const EditUser = function ({ classes, handleClose, handleFiledChange, updateUser, user }) {
    return (
        <>
            <Typography variant="h6" id="modal-title">
                Edit user
            </Typography>
            <TextField
                value={user.login}
                onChange={handleFiledChange}
                error={!user.login}
                id="login"
                label="Login"
                className={classes.textField}
                margin="normal"
                name="login"
            />
            <TextField
                value={user.type}
                onChange={handleFiledChange}
                id="login"
                label="Type"
                className={classes.textField}
                margin="normal"
                name="type"
            />
            <div>
                <Button variant="outlined"
                        color="primary"
                        className={classes.button}
                        onClick={updateUser}>
                    Update
                </Button>
                <Button variant="outlined"
                        color="secondary"
                        className={classes.button}
                        onClick={handleClose}>
                    Cancel
                </Button>
            </div>
        </>
    )
};

export default withStyles(styles)(EditUser)
