import "./styles/global.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login, Mypage, Register, Select, Start } from "./pages"
import { Header } from "./components/common"

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />

                <Routes>
                    <Route path="/" element={<Start />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/mypage" element={<Mypage />} />
                    <Route path="/select" element={<Select />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
