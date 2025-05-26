// ListaLivros.tsx
import React from "react";
import axios from "axios";

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
      await axios.put(`http://localhost:8080/livros/${id}/status?status=${novoStatus}`);
      setAtualizar(!atualizar);
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  return (
    <div style={{ flex: 1 }}>
      <h2>Lista de Livros</h2>
      <ul>
        {livros.map(livro => (
          <li key={livro.id}>
            {livro.titulo} - {livro.autor} ({livro.categoria}) - {livro.status}{" "}
            <button onClick={() => trocarStatus(livro.id, livro.status)} className={livro.status === "DISPONIVEL" ? "" : "devolver"}>
              {livro.status === "DISPONIVEL" ? "Emprestar" : "Devolver"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaLivros;
