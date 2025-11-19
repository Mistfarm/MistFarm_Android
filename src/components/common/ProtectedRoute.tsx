import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { JSX } from "react"

export function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { isLogined, isLoading } = useAuth()

    if (isLoading) return null

    if (!isLogined) {
        return <Navigate to="/login" replace />
    }

    return children
}
