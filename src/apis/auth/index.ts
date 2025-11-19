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
    return useMutation<number, AxiosError, RegisterRequest>({
        mutationFn: async (data) => {
            const res = await instance.post("/auth/signup", data)
            return res.status
        },
    })
}

export const useLogin = () => {
    const { login } = useAuth()

    return useMutation<number, AxiosError, LoginRequest>({
        mutationFn: async (data) => {
            const res = await instance.post<LoginResponse>("/auth/login", data)

            tempCookie.setAccessToken(res.data.accessToken)
            tempCookie.setRefreshToken(res.data.refreshToken)
            login()

            return res.status
        },
        onError: () => {
            tempCookie.clearTokens()
        },
    })
}

export const useLogout = () => {
    const { logout } = useAuth()

    return useMutation<number, AxiosError>({
        mutationFn: async () => {
            try {
                await instance.post("/auth/logout", {
                    refreshToken: tempCookie.getRefreshToken(),
                })
            } finally {
                tempCookie.clearTokens()
                logout()
            }
            return 200
        },
    })
}

export const useExit = () => {
    return useMutation<number, AxiosError>({
        mutationFn: async () => {
            try {
                await instance.delete("/me")
            } finally {
                tempCookie.clearTokens()
            }
            return 200
        },
    })
}

export const useEdit = () => {
    return useMutation<number, AxiosError, EditRequest>({
        mutationFn: async (data) => {
            const res = await instance.patch("/me", data)
            return res.status
        },
    })
}

export const useGetInfo = (options = {}) => {
    return useQuery<InfoResponse, AxiosError>({
        queryKey: ["userInfo"],
        queryFn: async () => {
            const res = await instance.get<InfoResponse>("/me")
            return res.data
        },
        staleTime: 0,
        gcTime: 0,
        retry: 0,
        enabled: false,
        throwOnError: true,
        ...options,
    })
}
