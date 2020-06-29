import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SimpleModal from "../SimpleModal";
import EditUser from "../EditUser";
import { getUsers } from "../../utils/endpoints";
import Loading from "../Loading";

const styles = () => ({
    root: {
        marginTop: 3,
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

class UsersList extends React.Component {
    state = {
        users: [
            // { id: 1, avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',	login: 'mojombo' },
            // { id: 2, avatar_url: 'https://avatars0.githubusercontent.com/u/2?v=4',	login: 'defunkt' }
        ],
        user: {},
        params: {
            perPage: 10,
            page: 1,
        },
        isOpen: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        this.getUsersFromServer()
    }

    getUsersFromServer = () => {
        this.setState({ loading: true });
        getUsers(this.state.params)
            .then((users) => {
                this.setState({ users })
            })
            .catch(() => {
                this.setState({ error: true })
            });
        this.setState({ loading: false })
    };

    handleEditClick = (user) => {
        this.setState({ isOpen: true, user })
    };

    handleDeleteClick = (user) => {
        let newUsers = this.state.users.filter(item => item.id !== user.id);
        this.setState({ users: newUsers });
    };

    handleClose = () => {
        this.setState({ isOpen: false, user: {} })
    };

    handleFiledChange = (e) => {
        let { name, value } = e.target;
        this.setState({ user: { ...this.state.user, [name]: value } })
    };

    updateUser = () => {
        const { user, users } = this.state;
        if (!user.login) return;
        let newUsers = users.map(item => item.id === user.id ? user : item);
        this.setState({
            users: newUsers,
            isOpen: false, user: {}
        });
    };


    render() {
        const { classes } = this.props;
        const { users, isOpen, user, loading, error } = this.state;

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
                        {users.map(user => (
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
                                                onClick={() => this.handleEditClick(user)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="Delete"
                                                onClick={() => this.handleDeleteClick(user)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <SimpleModal
                    children={EditUser}
                    handleClose={this.handleClose}
                    handleFiledChange={this.handleFiledChange}
                    updateUser={this.updateUser}
                    isOpen={isOpen}
                    user={user} />
            </Paper>
        )
    }
}

export default withStyles(styles)(UsersList)
