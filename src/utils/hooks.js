import {useState, useEffect} from 'react';
import { getUsers } from "./endpoints";

const useFetchUsers = () => {
    const [state, setState] = useState({ users: [], page: 0, perPage: 10 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        setError(false);

        try {
            const res = await getUsers({ page: state.page, perPage: state.perPage });
            setState(prev => ({
                ...prev,
                users: res
            }));
        } catch (e) {
            setError(true)
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return [{state, loading, error}, setState];
};

export default useFetchUsers
