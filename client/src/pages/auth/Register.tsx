import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Label } from "../../components/common/Label";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { Header } from "../../components/layout/Header";
import { UserSchema } from "../../schemas/user.validator";
import { getErrorMessageFromStatus } from "../../utils/errorHandler";

export const Register = () => {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      if (password !== confirmPassword) {
        setErrors(["As senhas não coincidem."]);
        return;
      }

      const parsed = await UserSchema.parseAsync({ name, email, password });
      const {
        name: parsedName = "",
        email: parsedEmail = "",
        password: parsedPassword = "",
      } = parsed;

      await register({ name: parsedName, email: parsedEmail, password: parsedPassword }); 
    } catch (err: any) {
      if (err?.name === "ZodError") {
        const zodErrors = err.errors.map((e: any) => e.message);
        setErrors(zodErrors);
      } else if (err?.response) {
        const status = err.response.status;
        const msg = getErrorMessageFromStatus(status, err.response.data.message);
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
          <h3 className="font-bold text-2xl">Criar conta</h3>
          <h5 className="text-sm text-zinc-500">
            Preencha os campos abaixo para criar sua conta
          </h5>
        </div>

        <div className="w-full">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            type="text"
            placeholder="Seu nome"
            className="w-full rounded-lg"
            value={name}
            onChange={e => setName(e.target.value)}
          />
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

        <div className="w-full">
          <Label htmlFor="confirmPassword">Confirmar senha</Label>
          <Input
            id="confirmPassword"
            type="password"
            className="w-full rounded-lg"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>

        {errors.length > 0 && (
          <div className="w-full text-red-500 text-sm space-y-1 text-center">
            {errors.map((err, idx) => (
              <p key={idx}>{err}</p>
            ))}
          </div>
        )}

        <Button
          className="w-full py-3 text-white rounded-lg bg-violet-500 hover:bg-violet-600"
          type="submit"
          disabled={loading}
        >
          {loading ? "Criando..." : "Criar conta"}
        </Button>

        <div className="text-sm text-center mt-4">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-violet-600 hover:underline">
            Entrar
          </Link>
        </div>
      </form>
    </div>
  );
};
