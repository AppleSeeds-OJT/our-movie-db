import axios from 'axios';

export default {
    get
}

function get(API) {
    return axios.get(API)
        .then(res => {
            return res.data
        })
        .catch(errFunc);
}

function errFunc(err) {
    console.log(err)
}