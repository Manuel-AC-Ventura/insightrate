import { Home } from "./pages/Home"
import { Login } from "./pages/auth/Login"
import { Register } from "./pages/auth/Register"
import { AuthProvider } from "./context/authContext"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export const App = () => {
  return(
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/home" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}