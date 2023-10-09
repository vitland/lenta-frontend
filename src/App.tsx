import Navbar from "./components/navbar/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Statistics from "./pages/statisticPage/Stratistics"
import Forecast from "./pages/forecastPage/Forecast"
import Login from "./pages/loginPage/Login"
import { PrivateRoute } from "./components/private-route/PrivateRoute"
import { useEffect } from "react"
import NotFound from "./pages/notfoundPage/NotFound"
import {getUser} from "./features/user/userSlice";
import {useAppDispatch} from "./app/hooks";

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      dispatch(getUser({id: userId}))
    }
  }, [])

  return (
    <BrowserRouter>
      <Navbar>
        <Routes>
          <Route
            path="/statistics"
            element={
              <PrivateRoute>
                <Statistics />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
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
