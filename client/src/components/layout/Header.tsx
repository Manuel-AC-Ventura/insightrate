import { Button } from "../common/Button";
import { MessageSquare } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";


export const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthPage = ["/login", "/register"].includes(location.pathname);
  const showGuestButtons = !isAuthenticated && !isAuthPage;
  const showUserButtons = isAuthenticated && !isAuthPage;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full flex items-center justify-center border-b border-zinc-300/50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-2 font-semibold text-xl">
            <MessageSquare className="h-5 w-5 text-violet-500" />
            <span>FeedbackHub</span>
          </div>
        </Link>

        {showGuestButtons && (
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button className="text-black border border-zinc-300/50 bg-transparent hover:bg-zinc-300/50">
                Entrar
              </Button>
            </Link>
            <Link to="/register">
              <Button className="text-white bg-violet-500 hover:bg-violet-600">
                Cadastrar
              </Button>
            </Link>
          </div>
        )}

        {showUserButtons && (
          <div className="flex items-center gap-4">
            {user?.name && (
              <span className="text-sm text-zinc-700">
                Olá, <strong>{user.name}</strong>
              </span>
            )}

            <Link to="/profile">
              <Button className="text-black border border-zinc-300/50 bg-transparent hover:bg-zinc-300/50">
                Perfil
              </Button>
            </Link>

            <Button
              onClick={handleLogout}
              className="text-white bg-violet-500 hover:bg-violet-600"
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}