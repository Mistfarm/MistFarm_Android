import "./styles/global.css"
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login, Mypage, Plant, Register, Plants, Setting, Start } from "./pages"
import { Header } from "./components/common"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ToastContainer } from "react-toastify"
import { AuthProvider } from "./hooks/useAuth"
import { ProtectedRoute } from "./components/common/ProtectedRoute"

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    pauseOnHover
                    closeOnClick
                />
                <BrowserRouter>
                    <Header />

                    <Routes>
                        <Route path="/" element={<Start />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route
                            path="/mypage"
                            element={
                                <ProtectedRoute>
                                    <Mypage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/plants"
                            element={
                                <ProtectedRoute>
                                    <Plants />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/setting"
                            element={
                                <ProtectedRoute>
                                    <Setting />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/detail"
                            element={
                                <ProtectedRoute>
                                    <Plant />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default App
