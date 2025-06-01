import React, { useState } from "react";
import axios from "axios";
import "../App.css";

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
      await axios.post("http://localhost:8081/livros", novoLivro);
      setTitulo("");
      setAutor("");
      setCategoria("");
      setStatus("DISPONIVEL");
      onLivroAdicionado();
      alert("Livro adicionado com sucesso!");
    } catch (error) {
      alert("Erro ao adicionar livro!");
      console.error("Erro ao adicionar livro:", error);
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center" }}>Adicionar Livro</h2>
        <div className="form-group">
          <label>Título:</label>
          <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Autor:</label>
          <input type="text" value={autor} onChange={e => setAutor(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Categoria:</label>
          <input type="text" value={categoria} onChange={e => setCategoria(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="DISPONIVEL">Disponível</option>
            <option value="EMPRESTADO">Emprestado</option>
          </select>
        </div>
        <button className="button-primary" type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default FormularioLivro;