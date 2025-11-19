import { createContext, useContext, useState, useEffect } from "react"
import { tempCookie } from "../utils/tempCookie"
import { useGetInfo } from "../apis/auth"

interface AuthContextType {
    isLogined: boolean
    isLoading: boolean
    login: () => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLogined, setIsLogined] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const login = () => setIsLogined(true)

    const logout = () => {
        tempCookie.clearTokens()
        setIsLogined(false)
    }

    const { refetch } = useGetInfo({ enabled: false })

    useEffect(() => {
        const checkAuth = async () => {
            const token = tempCookie.getAccessToken()

            if (!token) {
                setIsLogined(false)
                setIsLoading(false)
                return
            }

            try {
                await refetch()
                setIsLogined(true)
            } catch {
                tempCookie.clearTokens()
                setIsLogined(false)
            } finally {
                setIsLoading(false)
            }
        }

        checkAuth()
    }, [refetch])

    return (
        <AuthContext.Provider value={{ isLogined, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)

    if (!ctx) {
        return {
            isLogined: false,
            isLoading: false,
            login: () => {},
            logout: () => {},
        }
    }

    return ctx
}
