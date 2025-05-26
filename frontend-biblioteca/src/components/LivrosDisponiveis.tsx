import React from "react";

interface Livro {
  id: number;
  titulo: string;
  status: string;
}

interface Props {
  livros: Livro[];
  onRemoverLivro: (id: number) => void;
}

const LivrosDisponiveis: React.FC<Props> = ({ livros, onRemoverLivro }) => {
  const livrosDisponiveis = livros.filter(livro => livro.status === "DISPONIVEL");

  return (
    <div style={{ flex: 0.4, border: "1px solid #ccc", padding: "15px", borderRadius: "8px", height: "fit-content" }}>
      <h3>Livros Disponíveis</h3>
      {livrosDisponiveis.length === 0 ? (
        <p>Nenhum livro disponível.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {livrosDisponiveis.map(livro => (
            <li key={livro.id} style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>{livro.titulo} ({livro.status})</span>
              <button
                style={{
                  backgroundColor: "#e74c3c",
                  border: "none",
                  color: "white",
                  borderRadius: "5px",
                  cursor: "pointer",
                  padding: "5px 10px",
                }}
                onClick={() => onRemoverLivro(livro.id)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LivrosDisponiveis;
