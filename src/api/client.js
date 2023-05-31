import applyCaseMiddleware from 'axios-case-converter'
import axios from 'axios'

const options = {
    ignoreHeaders: true,
}

const client = applyCaseMiddleware(
    axios.create({
        baseURL: process.env.REACT_APP_PUBLIC_BACKEND_URL
    }),
    options
);

export default client;