import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"
import { tempCookie } from "../utils/tempCookie"

const BASEURL = process.env.REACT_APP_BASE_URL

export const instance = axios.create({
    baseURL: BASEURL,
    withCredentials: true,
    timeout: 10000,
})

instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = tempCookie.getAccessToken()
        if (token) {
            config.headers["Authorization"] = token
        }
        return config
    },
    (error) => Promise.reject(error)
)

let isRefreshing = false
let queue: any[] = []

const processQueue = (error: any, newToken: string | null) => {
    queue.forEach((p) => {
        if (error) p.reject(error)
        else p.resolve(newToken)
    })
    queue = []
}

instance.interceptors.response.use(
    (res) => res,

    async (error: AxiosError) => {
        const original = error.config as any

        if (error.response?.status !== 401 || original._retry) {
            return Promise.reject(error)
        }

        const refreshToken = tempCookie.getRefreshToken()
        if (!refreshToken) {
            tempCookie.clearTokens()
            return Promise.reject(error)
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                queue.push({ resolve, reject })
            }).then((newToken) => {
                original.headers["Authorization"] = `Bearer ${newToken}`
                return instance(original)
            })
        }

        original._retry = true
        isRefreshing = true

        try {
            const { data } = await axios.post(`${BASEURL}/auth/refresh`, {
                refreshToken,
            })

            tempCookie.setAccessToken(data.accessToken)
            tempCookie.setRefreshToken(data.refreshToken)

            processQueue(null, data.accessToken)

            original.headers["Authorization"] = `Bearer ${data.accessToken}`
            return instance(original)
        } catch (err) {
            tempCookie.clearTokens()
            processQueue(err, null)
            return Promise.reject(err)
        } finally {
            isRefreshing = false
        }
    }
)
