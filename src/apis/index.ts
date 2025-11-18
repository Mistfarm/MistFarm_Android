import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"
import { tempCookie } from "../utils/tempCookie"

const BASEURL = process.env.REACT_APP_BASE_URL

const instance = axios.create({
    baseURL: BASEURL,
    timeout: 10000,
    withCredentials: true,
})

instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = tempCookie.getAccessToken()
        if (token) {
            config.headers["Authorization"] = token
        }
        return config
    },
    (error: AxiosError) => Promise.reject(error)
)

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error)
        else if (token) prom.resolve(token)
    })
    failedQueue = []
}

instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as any
        const status = error.response?.status

        if (status === 401 && !originalRequest._retry) {
            const refreshToken = tempCookie.getRefreshToken()
            if (!refreshToken) {
                tempCookie.clearTokens()
                return Promise.reject(error)
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                }).then((newToken) => {
                    originalRequest.headers[
                        "Authorization"
                    ] = `Bearer ${newToken}`
                    return instance(originalRequest)
                })
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                const { data } = await axios.post(`${BASEURL}/auth/refresh`, {
                    refreshToken,
                })

                tempCookie.setAccessToken(data.accessToken)
                tempCookie.setRefreshToken(data.refreshToken)

                processQueue(null, data.accessToken)

                originalRequest.headers[
                    "Authorization"
                ] = `Bearer ${data.accessToken}`

                return instance(originalRequest)
            } catch (err) {
                tempCookie.clearTokens()
                processQueue(err, null)
                return Promise.reject(err)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)

export { instance }
