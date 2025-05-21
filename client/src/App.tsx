import { Home } from "./pages/Home";
import { Login } from "./pages/auth/Login";
import { Dashboard } from "./pages/dashboard";
import { Register } from "./pages/auth/Register";
import { NewBoard } from "./pages/dashboard/new";
import { Board } from "./pages/dashboard/[slug]";
import { GuestRoute } from "./components/GuestRoute";
import { AuthProvider } from "./contexts/authContext";
import { PrivateRoute } from "./components/PrivateRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route >

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/:slug" element={<Board />} />
            <Route path="/dashboard/new" element={<NewBoard />} />
          </Route >
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}