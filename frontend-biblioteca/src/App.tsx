import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import FormularioLivro from "./components/FormularioLivro";
import ListaLivros from "./components/ListaLivros";
import LivrosDisponiveis from "./components/LivrosDisponiveis";
import axios from "axios";
import "./App.css";

function App() {
  const [livros, setLivros] = useState([]);
  const [atualizar, setAtualizar] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8081/livros")
      .then(res => setLivros(res.data))
      .catch(err => console.error(err));
  }, [atualizar]);

  const handleLivroAdicionado = () => setAtualizar(a => !a);

  const handleRemoverLivro = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/livros/${id}`);
      setAtualizar(a => !a);
    } catch (error) {
      console.error("Erro ao remover livro:", error);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <h1 style={{ textAlign: "center", marginTop: 24 }}>Biblioteca</h1>
        <nav style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 32 }}>
          <Link to="/adicionar">Adicionar Livro</Link>
          <Link to="/lista">Lista de Livros</Link>
          <Link to="/disponiveis">Livros Disponíveis</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/adicionar" />} />
          <Route path="/adicionar" element={<FormularioLivro onLivroAdicionado={handleLivroAdicionado} />} />
          <Route path="/lista" element={
            <ListaLivros livros={livros} setAtualizar={setAtualizar} atualizar={atualizar} />
          } />
          <Route path="/disponiveis" element={
            <LivrosDisponiveis livros={livros} onRemoverLivro={handleRemoverLivro} />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;