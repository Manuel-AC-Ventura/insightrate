import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

interface Board {
  id: string;
  name: string;
  slug: string;
  description: string;
  private: boolean;
  createdAt: string;
}

export const Dashboard = () => {
  const { user } = useAuth();
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch(`/api/users/${user?.id}/boards`);
        const data = await response.json();
        setBoards(data);
      } catch (error) {
        console.error("Erro ao buscar boards:", error);
      }
    };

    if (user) fetchBoards();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Suas boards</h1>
      {boards.length === 0 ? (
        <p>Nenhuma board criada ainda.</p>
      ) : (
        <ul className="space-y-3">
          {boards.map((board) => (
            <li key={board.id} className="border rounded-xl p-4 shadow-sm">
              <Link to={`/dashboard/${board.slug}`} className="text-lg font-medium hover:underline">
                {board.name}
              </Link>
              <p className="text-sm text-gray-500">{board.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

