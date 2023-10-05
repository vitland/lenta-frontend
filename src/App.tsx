import Navbar from "./components/navbar/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Orders from "./pages/Orders"
import Statistics from "./pages/Stratistics"
import Forecast from "./pages/Forecast"

function App() {
  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
          <Route path="/" element={<Statistics />} />
          <Route path="/forecast" element={<Orders />} />
          <Route path="/statistics" element={<Forecast />} />
        </Routes>
      </Navbar>
    </BrowserRouter>
  )
}

export default App
