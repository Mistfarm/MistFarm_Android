import axios, {
    AxiosError,
    InternalAxiosRequestConfig,
    AxiosResponse,
} from "axios"
import { tempCookie } from "../utils/tempCookie"

const BASEURL = process.env.REACT_APP_BASE_URL

const instance = axios.create({
    baseURL: BASEURL,
    timeout: 10000,
    withCredentials: false,
})

instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = tempCookie.getAccessToken()
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config
    },
    (error: AxiosError) => Promise.reject(error)
)

let isRefreshing = false
let failedQueue: Array<{
    resolve: (token: string) => void
    reject: (error: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error)
        else if (token) prom.resolve(token)
    })
    failedQueue = []
}

instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise<string>((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                })
                    .then((newToken: string) => {
                        originalRequest.headers[
                            "Authorization"
                        ] = `Bearer ${newToken}`
                        return instance(originalRequest)
                    })
                    .catch((err) => Promise.reject(err))
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                const refreshToken = tempCookie.getRefreshToken()
                if (!refreshToken) return Promise.reject(error)

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
                processQueue(err, null)
                tempCookie.clearTokens()
                return Promise.reject(err)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(error)
    }
)

export { instance }
