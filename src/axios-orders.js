import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://myburger-97b45.firebaseio.com/'
});

export default instance;