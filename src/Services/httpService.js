import axios from 'axios';

export default {
    get
}

async function get(API) {
    try {
        const fetchedResults = await axios.get(API)
        return fetchedResults.data
    } catch(err) {
        errFunc(err)
    }
}

function errFunc(err) {
    console.log(err)
}