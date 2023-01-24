import axios from 'axios'

const journalApi = axios.create({
    baseURL: 'https://product-hunt-759b0-default-rtdb.firebaseio.com'
})

export default journalApi;