import Navbar from "./components/navbar/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Statistics from "./pages/Stratistics"
import Forecast from "./pages/Forecast"

function App() {
  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </Navbar>
    </BrowserRouter>
  )
}

export default App
