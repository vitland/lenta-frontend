import Navbar from "./components/navbar/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Orders from "./pages/Orders"
import Statistics from "./pages/Stratistics"
import Prediction from "./pages/Prediction"

function App() {
  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
          <Route path="/" element={<Statistics />} />
          <Route path="/forecast" element={<Orders />} />
          <Route path="/statistics" element={<Prediction />} />
        </Routes>
      </Navbar>
    </BrowserRouter>
  )
}

export default App
