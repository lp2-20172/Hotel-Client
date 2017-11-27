import axios from 'axios'

export const TOGGLE_THEME_SHADE = 'TOGGLE_THEME_SHADE'
export const toggleTheme = () => ({
    type: TOGGLE_THEME_SHADE,
})

const client = axios.create({
    baseURL: "https://hotel-serve.herokuapp.com/"
})
client.interceptors.request.use(
    async (config) => {
        const token = await localStorage.getItem('userToken')
        if (token) {
            config.headers.common['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    (error) => Promise.reject(error)
)
client.interceptors.response.use(
    response => response,
    (error) => {
        if (error.response.status === 401) {
            console.log('interceptors error 401')
        }
        return Promise.reject(error);
    }
);
export default client