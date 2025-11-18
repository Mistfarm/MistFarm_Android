import { createContext, useContext, useState, useEffect } from "react"
import { tempCookie } from "../utils/tempCookie"
import { instance } from "../apis"

interface AuthContextType {
    isLogined: boolean
    login: () => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLogined, setIsLogined] = useState<boolean>(false)

    const login = () => setIsLogined(true)

    const logout = () => {
        tempCookie.clearTokens()
        setIsLogined(false)
    }

    useEffect(() => {
        const checkAuth = async () => {
            const token = tempCookie.getAccessToken()

            if (!token) {
                setIsLogined(false)
                return
            }

            try {
                await instance.get("/auth/check")
                setIsLogined(true)
            } catch {
                tempCookie.clearTokens()
                setIsLogined(false)
            }
        }

        checkAuth()
    }, [])

    return (
        <AuthContext.Provider value={{ isLogined, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)

    if (!ctx) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return {
            isLogined: false,
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            login: () => {},
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            logout: () => {},
        }
    }

    return ctx
}
