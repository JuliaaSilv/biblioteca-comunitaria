import React, { useState } from "react";
import axios from "axios";

interface Livro {
  id?: number;
  titulo: string;
  autor: string;
  categoria: string;
  status: string;
}

const FormularioLivro: React.FC<{ onLivroAdicionado: () => void }> = ({ onLivroAdicionado }) => {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [status, setStatus] = useState("DISPONIVEL");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const novoLivro: Livro = { titulo, autor, categoria, status };

    try {
      await axios.post("http://localhost:8080/livros", novoLivro);
      setTitulo("");
      setAutor("");
      setCategoria("");
      setStatus("DISPONIVEL");
      onLivroAdicionado(); // Para recarregar a lista
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Adicionar Livro</h2>
      <div>
        <label>Título:</label>
        <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} required />
      </div>
      <div>
        <label>Autor:</label>
        <input type="text" value={autor} onChange={e => setAutor(e.target.value)} required />
      </div>
      <div>
        <label>Categoria:</label>
        <input type="text" value={categoria} onChange={e => setCategoria(e.target.value)} required />
      </div>
      <div>
        <label>Status:</label>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="DISPONIVEL">Disponível</option>
          <option value="EMPRESTADO">Emprestado</option>
        </select>
      </div>
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default FormularioLivro;
