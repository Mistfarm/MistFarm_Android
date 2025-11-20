import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export function Start() {
    const navigate = useNavigate()
    const { isLogined, isLoading } = useAuth()

    useEffect(() => {
        if (isLoading) return
        if (isLogined) navigate("/areas")
        else navigate("/login")
    }, [isLogined, isLoading])

    return null
}
