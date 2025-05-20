import { useState } from "react";
import { Input } from "../Input";
import { Label } from "../Label";
import { Button } from "../Button";

type AuthFormProps = {
  title: string;
  subtitle?: string;
  onSubmit: (email: string, password: string) => Promise<void>;
  loading: boolean;
  error?: string | null;
  validationError?: string | null;
};

export const AuthForm = ({
  title,
  subtitle,
  onSubmit,
  loading,
  error,
  validationError,
}: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <form
      className="bg-white flex flex-col items-center justify-center py-10 px-7 gap-4 w-full rounded-lg max-w-md mx-auto mt-10"
      onSubmit={handleSubmit}
    >
      <div className="w-full">
        <h3 className="font-bold text-2xl">{title}</h3>
        {subtitle && <h5 className="text-sm text-zinc-500">{subtitle}</h5>}
      </div>

      <div className="w-full">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          placeholder="seu@email.com"
          className="w-full rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="w-full">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          value={password}
          className="w-full rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {validationError && (
        <div className="w-full text-red-500 text-sm text-center">{validationError}</div>
      )}
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
    </form>
  );
};