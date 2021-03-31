import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'https://localhost:5001/api/PostInfo'
});

export default instance;