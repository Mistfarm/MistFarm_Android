import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { tempCookie } from "../utils/tempCookie"
import { useGetInfo } from "../apis/auth"

export function Start() {
    const navigate = useNavigate()

    const token = tempCookie.getAccessToken()

    const {
        data: userInfo,
        isError,
        isLoading,
    } = useGetInfo({
        enabled: !!token,
        retry: 0,
    })

    useEffect(() => {
        if (isLoading) return

        if (token && userInfo) {
            navigate("/plants")
        } else if (!token || isError) {
            navigate("/login")
        }
    }, [token, userInfo, isError, isLoading, navigate])

    return null
}
