import axios from "axios"
// custom axios setup containing:

// base URL
// credentials
// headers

// Used for API calls.
export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api",
    withCredentials: true //to send cookie along with all requests
})