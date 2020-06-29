import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SimpleModal from "../SimpleModal";
import EditUser from "../EditUser";
import React, { useState }from 'react';
import useFetchUsers from "../../utils/hooks";
import Loading from "../Loading";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
    root: {
        marginTop: 50,
        padding: 40,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    avatar: {
        margin: 10,
    }
});

const UsersList = function (props) {
    const { classes } = props;
    const [isOpen, setIsOPen] = useState(false);
    const [user, setUser] = useState({});
    const [{ state, loading, error }, setState] = useFetchUsers();

    const handleEditClick = (user) => {
        setIsOPen(true);
        setUser(user);
    };

    const handleDeleteClick = (user) => {
        let newUsers = state.users.filter(item => item.id !== user.id);
        setState({ ...state, users: newUsers })
    };

    const handleClose = () => {
        setIsOPen(false);
        setUser({});
    };

    const handleFiledChange = (e) => {
        let { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const updateUser = () => {
        const { users } = state;
        if (!user.login) return;
        let newUsers = users.map(item => item.id === user.id ? user : item);
        setState({ ...state, users: newUsers});
        setIsOPen(false)
    };

    if (error) return (<div>Something went wrong.</div>);

    if (loading) return (<Loading />);

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>User avatar</TableCell>
                        <TableCell>Login</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell align="right">Edit</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell component="th" scope="row">
                                <Avatar alt="Remy Sharp"
                                        src={user.avatar_url}
                                        className={classes.avatar} />
                            </TableCell>
                            <TableCell>{user.login}</TableCell>
                            <TableCell>{user.type}</TableCell>
                            <TableCell align="right">
                                <IconButton aria-label="Delete"
                                            onClick={() => handleEditClick(user)}>
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell align="right">
                                <IconButton aria-label="Delete"
                                            onClick={() => handleDeleteClick(user)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <SimpleModal
                children={EditUser}
                handleClose={handleClose}
                handleFiledChange={handleFiledChange}
                updateUser={updateUser}
                isOpen={isOpen}
                user={user} />
        </Paper>
    )
};

export default withStyles(styles)(UsersList)
