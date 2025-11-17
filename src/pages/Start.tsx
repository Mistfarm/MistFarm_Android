import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { tempCookie } from "../utils/tempCookie"

export function Start() {
    const navigate = useNavigate()

    useEffect(() => {
        if (tempCookie.getAccessToken()) {
            navigate("/plants")
        } else {
            navigate("/login")
        }
    })

    return <></>
}
