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

export const useRegister = () => {
    const { mutate, ...rest } = useMutation<
        number,
        AxiosError,
        RegisterRequest
    >({
        mutationFn: async (data) => {
            const response = await instance.post("/auth/signup", data)
            return response.status
        },
        onError: (error) => {
            console.error("회원가입 실패:", error.response?.data)
        },
    })

    return { mutate, ...rest }
}

export const useLogin = () => {
    const { mutate, ...rest } = useMutation<number, AxiosError, LoginRequest>({
        mutationFn: async (data) => {
            const response = await instance.post<LoginResponse>(
                "/auth/login",
                data
            )

            if (response.data.accessToken && response.data.refreshToken) {
                tempCookie.setAccessToken(response.data.accessToken)
                tempCookie.setRefreshToken(response.data.refreshToken)
            } else {
                console.error("토큰이 반환되지 않았습니다")
            }

            return response.status
        },
        onError: (error) => {
            console.error("로그인 실패:", error.response?.data)
            tempCookie.clearTokens()
        },
    })

    return { mutate, ...rest }
}

export const useLogout = () => {
    const { mutate, ...rest } = useMutation<number, AxiosError>({
        mutationFn: async () => {
            await instance.post("/auth/logout")
            tempCookie.clearTokens()
            return 200
        },
        onError: (error) => {
            console.error("로그아웃 실패:", error.response?.data)
        },
    })

    return { mutate, ...rest }
}

export const useExit = () => {
    const { mutate, ...rest } = useMutation<number, AxiosError>({
        mutationFn: async () => {
            await instance.delete("/me")
            tempCookie.clearTokens()
            return 200
        },
        onError: (error) => {
            console.error("회원 탈퇴 실패:", error.response?.data)
        },
    })

    return { mutate, ...rest }
}

export const useEdit = () => {
    const { mutate, ...rest } = useMutation<number, AxiosError, EditRequest>({
        mutationFn: async (data) => {
            const response = await instance.patch("/me", data)
            return response.status
        },
        onError: (error) => {
            console.error("회원 정보 수정 실패:", error.response?.data)
        },
    })

    return { mutate, ...rest }
}

export const useGetInfo = () => {
    return useQuery<InfoResponse, AxiosError>({
        queryKey: ["userInfo"],
        queryFn: async () => {
            const response = await instance.get<InfoResponse>("/me")
            return response.data
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })
}
