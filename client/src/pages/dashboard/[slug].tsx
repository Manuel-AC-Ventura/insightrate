import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Suggestion {
  id: string;
  title: string;
  description: string;
  status: string;
  votesCount: number;
  createdAt: string;
}

export const Board = () => {
  const { slug } = useParams<{ slug: string }>();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [boardName, setBoardName] = useState("");

  useEffect(() => {
    const fetchBoardSuggestions = async () => {
      try {
        const response = await fetch(`/api/boards/${slug}`);
        const data = await response.json();
        setBoardName(data.name);
        setSuggestions(data.suggestions);
      } catch (error) {
        console.error("Erro ao buscar sugestões:", error);
      }
    };

    fetchBoardSuggestions();
  }, [slug]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">{boardName}</h1>

      {suggestions.length === 0 ? (
        <p>Nenhuma sugestão ainda.</p>
      ) : (
        <ul className="space-y-4">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} className="border p-4 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold">{suggestion.title}</h2>
              <p className="text-sm text-gray-600">{suggestion.description}</p>
              <div className="text-xs text-gray-400 mt-1">Status: {suggestion.status} • {suggestion.votesCount} votos</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
