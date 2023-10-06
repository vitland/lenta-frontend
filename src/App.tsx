import Navbar from "./components/navbar/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Orders from "./pages/Orders"
import Statistics from "./pages/Stratistics"
import Forecast from "./pages/Forecast"
import Login from "./pages/loginPage/Login"

function App() {
  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
          <Route path="/" element={<Statistics />} />
          <Route path="/forecast" element={<Orders />} />
          <Route path="/statistics" element={<Forecast />} />
          <Route path="/sign-in" element={<Login />} />
        </Routes>
      </Navbar>
    </BrowserRouter>
  )
}

export default App
