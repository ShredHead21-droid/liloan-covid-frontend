import axios from 'axios'

const axiosHelper = axios.create({
    baseURL:'https://www.googleapis.com/youtube/v3'
    })

export default axiosHelper;