import axios from "axios"
// custom axios setup containing:

// base URL
// credentials
// headers

// Used for API calls.
export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "/api",
    withCredentials: true //to send cookie along with all requests
})
