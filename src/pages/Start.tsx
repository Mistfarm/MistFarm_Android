import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export function Start() {
    const navigate = useNavigate()
    const { isLogined } = useAuth()

    useEffect(() => {
        if (isLogined) navigate("/areas")
        else navigate("/login")
    }, [isLogined])

    return null
}
