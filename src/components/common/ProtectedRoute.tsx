import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { JSX } from "react"

export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { isLogined } = useAuth()

    if (!isLogined) {
        return <Navigate to="/login" replace />
    }

    return children
}
