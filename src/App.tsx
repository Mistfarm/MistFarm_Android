import "./styles/global.css"
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login, Mypage, Plant, Register, Plants, Setting, Start } from "./pages"
import { Header } from "./components/common"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ToastContainer } from "react-toastify"

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
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
                    <Route path="/mypage" element={<Mypage />} />
                    <Route path="/plants" element={<Plants />} />
                    <Route path="/setting" element={<Setting />} />
                    <Route path="/detail" element={<Plant />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
