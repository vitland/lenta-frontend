import Navbar from "./components/navbar/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Orders from "./pages/Orders"
import Statistics from "./pages/Stratistics"
import Forecast from "./pages/Forecast"
import Login from "./pages/loginPage/Login"
import { PrivateRoute } from "./components/private-route/PrivateRoute"
import { useEffect } from "react"
import { getUser } from "./service"

function App() {
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser()
      if (user) {
        localStorage.setItem("user", JSON.stringify(user))
      }
    }

    fetchUser()
  }, [])

  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Statistics />
              </PrivateRoute>
            }
          />
          <Route
            path="/forecast"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route
            path="/statistics"
            element={
              <PrivateRoute>
                <Forecast />
              </PrivateRoute>
            }
          />
          <Route path="/sign-in" element={<Login />} />
        </Routes>
      </Navbar>
    </BrowserRouter>
  )
}

export default App
