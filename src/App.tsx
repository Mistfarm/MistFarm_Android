import "./styles/global.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Start } from "./pages"
import { Header } from "./components/common"

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />

                <Routes>
                    <Route path="/" element={<Start />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
