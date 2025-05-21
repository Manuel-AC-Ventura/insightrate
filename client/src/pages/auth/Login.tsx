import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Label } from "../../components/common/Label";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { Header } from "../../components/layout/Header";
import { UserSchema } from "../../schemas/user.validator";
import { getErrorMessageFromStatus } from "../../utils/errorHandler";

export const Login = () => {
  const { login } = useAuth();
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      const parsed = await UserSchema.parseAsync({ email, password });

      await login(parsed.email ?? "", parsed.password ?? "");
    } catch (err: any) {
      if (err?.name === "ZodError") {
        const zodErrors = err.errors.map((e: any) => e.message);
        setErrors(zodErrors);
      } else if (err?.response) {
        const msg = getErrorMessageFromStatus(err.response.status, err.response.data.message);
        setErrors([msg]);
      } else {
        setErrors(["Erro inesperado. Tente novamente."]);
      }
    } finally {
      setLoading(false);
    }
  };

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

        {errors.length > 0 && (
          <div className="w-full text-red-500 text-sm text-center space-y-1">
            {errors.map((err, idx) => (
              <p key={idx}>{err}</p>
            ))}
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-violet-500 hover:bg-violet-600 text-white rounded-lg outline-none"
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
