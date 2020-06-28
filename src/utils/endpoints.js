export const getUsers = (params) => fetch(`https://api.github.com/users?page=${params.page}&per_page=${params.perPage}`, {
    headers: {
        Accept: 'application/json',
    },
}).then((response) => response.json())
