import Navbar from "./components/navbar/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Statistics from "./pages/statisticPage/Stratistics"
import Forecast from "./pages/forecastPage/Forecast"
import Login from "./pages/loginPage/Login"
import { PrivateRoute } from "./components/private-route/PrivateRoute"
import { useEffect } from "react"
import { getUser } from "./service"
import NotFound from "./pages/notfoundPage/NotFound"
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
                <Forecast />
              </PrivateRoute>
            }
          />
          <Route path="/sign-in" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Navbar>
    </BrowserRouter>
  )
}

export default App
