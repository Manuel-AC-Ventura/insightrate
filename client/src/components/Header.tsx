import { Button } from "./Button"
import { MessageSquare } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export function Header() {
  const location = useLocation()
  const hideAuthButtons = ["/login", "/register"].includes(location.pathname)

  return (
    <header className="sticky top-0 z-50 w-full flex items-center justify-center border-b border-zinc-300/50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-2 font-semibold text-xl">
            <MessageSquare className="h-5 w-5 text-violet-500" />
            <span>FeedbackHub</span>
          </div>
        </Link>
        {!hideAuthButtons && (
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button className="text-black border border-zinc-300/50 bg-transparent hover:bg-zinc-300/50" >
                Entrar
              </Button>
            </Link>
            <Link to="/register">
              <Button className="text-white bg-violet-500 hover:bg-violet-600" >
                Cadastrar
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}