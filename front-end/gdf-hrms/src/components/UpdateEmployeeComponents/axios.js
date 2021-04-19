import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'https://localhost:5001/api/UpdateInfo/update'
});

export default instance;