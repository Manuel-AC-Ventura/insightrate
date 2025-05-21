import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const NewBoard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    private: false,
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? target.checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("/api/boards", {
        ...form,
        ownerId: user?.id,
      });

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao criar board");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Nova Board</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nome</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Slug</label>
          <input
            type="text"
            name="slug"
            className="w-full p-2 border rounded"
            value={form.slug}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Descrição</label>
          <textarea
            name="description"
            className="w-full p-2 border rounded"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="private"
            checked={form.private}
            onChange={handleChange}
          />
          <label>Privada</label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Criar
        </button>
      </form>
    </div>
  );
};
