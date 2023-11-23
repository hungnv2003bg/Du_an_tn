import axios from 'axios'
const ghn = axios.create({
    // You can add your headers here
    // ================================
    baseURL: "https://online-gateway.ghn.vn",
    timeout: 100000,
    // headers: {'X-Custom-Header': 'foobar'}
})


// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
ghn.interceptors.request.use(config => {
    // Retrieve token from localStorage

    // If token is found
    // Get request headers and if headers is undefined assign blank object
    config.headers = config.headers || {
        token: "5f3e5e26-69a8-11ed-b190-ea4934f9883e"
    }
    config.headers.token = "5f3e5e26-69a8-11ed-b190-ea4934f9883e"
    config.headers.shop_id = "3474985"
    // Set authorization header
    // ℹ️ JSON.parse will convert token to string

    // Return modified config
    return config
})

// ℹ️ Add response interceptor to handle 403 response
ghn.interceptors.response.use(response => {
    return response
}, error => {
    console.log(error);
    // Handle error
    if (error.response.status === 403) {
        // ℹ️ Logout user and redirect to login page
        // Remove "userData" from localStorage
    }
    else {
        return Promise.reject(error)
    }
})
export default ghn