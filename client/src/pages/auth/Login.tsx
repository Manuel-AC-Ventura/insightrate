import { useState } from "react";
//import { login } from "../../api/auth";
import { useAuth } from "../../hooks/useAuth";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { userSchema } from "../../schemas/user.validator";

export const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const schema = userSchema.parseAsync({ email, password });
      const user = await login(email, password);

     // const user = await login({ email, password });

    } catch (error) {
      
    }
  }

  return (
    <div className="bg-gray-100 h-dvh space-y-50">
      <Header />

      <form
        className="bg-white flex flex-col items-center justify-center py-10 px-7 gap-4 w-full rounded-lg max-w-md mx-auto mt-10"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <h3 className="font-bold text-2xl">Entrar</h3>
          <h5 className="text-sm text-zinc-500">
            Entre com seu email e senha para acessar sua conta
          </h5>
        </div>
        <div className="w-full">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            className="w-full rounded-lg"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            className="w-full rounded-lg"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <div className="w-full text-red-500 text-sm text-center">{error}</div>
        )}
        <Button
          className="w-full py-3 text-white rounded-lg bg-violet-500 hover:bg-violet-600"
          type="submit"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>

        <div className="text-sm text-center mt-4">
          Não tem uma conta?{" "}
          <Link to="/register" className="text-violet-600 hover:underline">
            Cadastrar-se
          </Link>
        </div>
      </form>
    </div>
  );
};