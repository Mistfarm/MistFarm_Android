import { useMutation, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { instance } from ".."
import { tempCookie } from "../../utils/tempCookie"

import {
    EditRequest,
    InfoResponse,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
} from "./type"
import { useAuth } from "../../hooks/useAuth"

export const useRegister = () => {
    const { mutate, ...rest } = useMutation<
        number,
        AxiosError,
        RegisterRequest
    >({
        mutationFn: async (data) => {
            const res = await instance.post("/auth/signup", data)
            return res.status
        },
        onError: (err) => {
            console.error("회원가입 실패:", err.response?.data)
        },
    })

    return { mutate, ...rest }
}

export const useLogin = () => {
    const { login } = useAuth()

    const { mutate, ...rest } = useMutation<number, AxiosError, LoginRequest>({
        mutationFn: async (data) => {
            const res = await instance.post<LoginResponse>("/auth/login", data)

            if (res.data.accessToken && res.data.refreshToken) {
                tempCookie.setAccessToken(res.data.accessToken)
                tempCookie.setRefreshToken(res.data.refreshToken)
                login()
            } else {
                console.error("토큰이 반환되지 않았습니다")
            }

            return res.status
        },
        onError: (error) => {
            console.error("로그인 실패:", error.response?.data)
            tempCookie.clearTokens()
        },
    })

    return { mutate, ...rest }
}

export const useLogout = () => {
    const { logout } = useAuth()

    const { mutate, ...rest } = useMutation<number, AxiosError>({
        mutationFn: async () => {
            const accessToken = tempCookie.getAccessToken()
            const refreshToken = tempCookie.getRefreshToken()

            if (!accessToken || !refreshToken) {
                tempCookie.clearTokens()
                logout()
                return 200
            }

            try {
                await instance.post(
                    "/auth/logout",
                    { refreshToken },
                    {
                        headers: {
                            Authorization: accessToken,
                        },
                        withCredentials: true,
                    }
                )

                tempCookie.clearTokens()
                logout()
                return 200
            } catch (error) {
                tempCookie.clearTokens()
                logout()
                throw error
            }
        },

        onSuccess: () => {
            console.log("로그아웃 성공")
        },

        onError: (err) => {
            console.error("로그아웃 실패:", err.response?.data)
        },
    })

    return { mutate, ...rest }
}

export const useExit = () => {
    const { mutate, ...rest } = useMutation<number, AxiosError>({
        mutationFn: async () => {
            const accessToken = tempCookie.getAccessToken()
            const refreshToken = tempCookie.getRefreshToken()

            if (!accessToken && !refreshToken) {
                tempCookie.clearTokens()
                return 200
            }

            try {
                await instance.delete("/me", {
                    headers: {
                        Authorization: accessToken ?? "",
                    },
                    withCredentials: true,
                })

                tempCookie.clearTokens()
                return 200
            } catch (error: any) {
                tempCookie.clearTokens()
                throw error
            }
        },
        onError: (err) => {
            console.error("회원 탈퇴 실패:", err.response?.data)
        },
    })

    return { mutate, ...rest }
}

export const useEdit = () => {
    const { mutate, ...rest } = useMutation<number, AxiosError, EditRequest>({
        mutationFn: async (data) => {
            const accessToken = tempCookie.getAccessToken()
            if (!accessToken) throw new Error("로그인이 필요합니다.")

            const res = await instance.patch("/me", data, {
                headers: {
                    Authorization: accessToken,
                },
                withCredentials: true,
            })

            return res.status
        },
        onError: (err) => {
            console.error("회원 정보 수정 실패:", err.response?.data)
        },
    })

    return { mutate, ...rest }
}

export const useGetInfo = (options = {}) => {
    return useQuery<InfoResponse, AxiosError>({
        queryKey: ["userInfo"],
        queryFn: async () => {
            const res = await instance.get<InfoResponse>("/me")
            return res.data
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
        enabled: false,
        ...options,
    })
}
