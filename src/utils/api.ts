import axios from 'axios'
import { store } from '../stores/store'
import { setToken } from '../stores/reducer'

const baseUrl = `https://dev.profescipta.co.id/so-api/`

const apiRequest = axios.create({ baseURL: baseUrl, })

apiRequest.interceptors.request.use(
    async (config) => {
        var token = store.getState().data.token
        if (token == '') token = await generateToken()

        config.headers.Authorization = `Bearer ${token}`
        config.headers.Accept = `application/json`

        console.log('API_REQ', config.url, config.headers, config.data)

        return config
    },
    (error) => Promise.resolve({ error }),
)

apiRequest.interceptors.response.use(
    resp => {
        console.log('API_RES', resp.data)
        return resp.data
    },
    async (error) => {
        console.log('API_ERR', error)
        if (error.response) {

            if (error.response.status == 401) {
                const token = await generateToken()
                const originalReq = error.config
                originalReq._retry = true
                originalReq.headers = {
                    ...originalReq.headers,
                    'Authorization': `Bearer ${token}`
                }

                return axios(originalReq)
            }
        }

        return Promise.resolve({ error })
    }
)

const dispatch = store.dispatch

const generateToken = async () => {
    const { data: refreshData } = await axios.post(
        `${baseUrl}token`,
        {
            grant_type: 'client_credentials',
            client_id: 'profes-api',
            client_secret: 'P@ssw0rd',
        },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    ).catch((err) => {
        console.log('gen token err', err.response)
    })

    if (refreshData) {
        dispatch(setToken(refreshData.access_token))
        return refreshData.access_token
    }

    return ''
}

export { apiRequest }