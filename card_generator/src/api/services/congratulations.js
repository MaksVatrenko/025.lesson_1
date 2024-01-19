import axios from '../initial';

const congratulations = {
    get: () => axios.get('/congratulations')
        .then((data) => data)
        .catch((error) => console.log(error)),
    post: (params) => axios.post('/congratulations', params)
        .then((data) => data)
        .catch((error) => console.log(error)),
    delete: (id) => axios.delete(`/congratulations/${id}`)
        .then((data) => data)
        .catch((error) => console.log(error)),
    put: (id, params) => axios.put(`/congratulations/${id}`, params)
}

export default congratulations;