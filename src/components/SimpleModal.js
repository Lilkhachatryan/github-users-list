import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import simpleModalStyles from "../assets/styles/simpleModalStyles";

const SimpleModal = function (props) {
    const { classes, handleClose, isOpen, children: ChildrenComponent, ...rest } = props;

    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={isOpen}
            onClose={handleClose}
        >
            <div className={classes.modalPaper}>
                <ChildrenComponent {...rest}/>
            </div>
        </Modal>
    );
};

export default withStyles(simpleModalStyles)(SimpleModal)
