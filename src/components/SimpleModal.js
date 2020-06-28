import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = () => ({
    modalPaper:  {
        position: 'absolute',
        width: 500,
        backgroundColor: '#fff',
        boxShadow: 3,
        textAlign: 'center',
        padding: 20,
        outline: 'none',
    },
    textField: {
        marginLeft: 10,
        marginRight: 10,
        width: 250,
    },
    button: {
        margin: 10,
    }
});

class SimpleModal extends React.Component {
    getModalStyle = () => {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    };


    render() {
        const { classes, handleClose, handleFiledChange, updateUser, isOpen, user } = this.props;

        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={isOpen}
                onClose={handleClose}
            >
                <div style={this.getModalStyle()} className={classes.modalPaper}>
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
                </div>
            </Modal>
        )
    }
}

export default withStyles(styles)(SimpleModal)
