import { useState } from "react";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { userSchema } from "../../schemas/user.validator";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate with zod schema
    const result = userSchema.safeParse({
      name,
      email,
      password,
      passwordConfirmation: confirmPassword,
    });

    if (!result.success) {
      // Show first error message
      const firstError = Object.values(result.error.flatten().fieldErrors)[0]?.[0];
      setError(firstError || "Dados inválidos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao registrar.");
        setLoading(false);
        return;
      }

      navigate("/login");
    } catch (err) {
      setError("Erro de conexão com o servidor.");
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
        {error && (
          <div className="w-full text-red-500 text-sm text-center">{error}</div>
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
