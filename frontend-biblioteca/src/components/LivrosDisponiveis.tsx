import React, { useState } from "react";
import "../App.css";

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
  const [busca, setBusca] = useState("");
  const livrosDisponiveis = livros.filter(
    livro => livro.status === "DISPONIVEL" && livro.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="card">
      <h3 style={{ textAlign: "center" }}>Livros Disponíveis</h3>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Buscar livro disponível..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          style={{ padding: "5px", width: "80%" }}
        />
      </div>
      {livrosDisponiveis.length === 0 ? (
        <p>Nenhum livro disponível.</p>
      ) : (
        <div>
          {livrosDisponiveis.map(livro => (
            <div className="livro-card" key={livro.id}>
              <span>{livro.titulo}</span>
              <div>Status: {livro.status}</div>
              <div className="actions">
                <button
                  style={{
                    backgroundColor: "#e74c3c",
                    border: "none",
                    color: "white",
                    borderRadius: "5px",
                    cursor: "pointer",
                    padding: "5px 10px",
                    flex: 1
                  }}
                  onClick={() => onRemoverLivro(livro.id)}
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LivrosDisponiveis;