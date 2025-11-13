import "./styles/global.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login, Mypage, Plant, Register, Plants, Setting, Start } from "./pages"
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
                    <Route path="/plants" element={<Plants />} />
                    <Route path="/setting" element={<Setting />} />
                    {/* <Route path="/plants/:id" element={<Plant />} /> */}
                    <Route path="/detail" element={<Plant />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
