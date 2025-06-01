import React from "react";
import axios from "axios";

import "../App.css";

interface Livro {
  id: number;
  titulo: string;
  autor: string;
  categoria: string;
  status: string;
}

interface Props {
  livros: Livro[];
  atualizar: boolean;
  setAtualizar: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListaLivros: React.FC<Props> = ({ livros, atualizar, setAtualizar }) => {

  const trocarStatus = async (id: number, statusAtual: string) => {
    const novoStatus = statusAtual === "DISPONIVEL" ? "EMPRESTADO" : "DISPONIVEL";
    try {
      await axios.put(`http://localhost:8081/livros/${id}/status?status=${novoStatus}`);
      setAtualizar(!atualizar);
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  return (
    <div className="card">
      <h2 style={{ textAlign: "center" }}>Lista de Livros</h2>
      {livros.length === 0 ? (
        <p>Nenhum livro cadastrado.</p>
      ) : (
        <div>
          {livros.map(livro => (
            <div className="livro-card" key={livro.id}>
              <span>{livro.titulo}</span>
              <div>Autor: {livro.autor}</div>
              <div>Categoria: {livro.categoria}</div>
              <div>Status: {livro.status}</div>
              <div className="actions">
                <button
                  onClick={() => trocarStatus(livro.id, livro.status)}
                  style={{
                    backgroundColor: livro.status === "DISPONIVEL" ? "#27ae60" : "#f39c12",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    padding: "5px 10px",
                    flex: 1
                  }}
                >
                  {livro.status === "DISPONIVEL" ? "Emprestar" : "Devolver"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaLivros;