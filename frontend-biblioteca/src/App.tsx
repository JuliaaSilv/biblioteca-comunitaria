import React, { useState, useEffect } from "react";
import FormularioLivro from "./components/FormularioLivro";
import ListaLivros from "./components/ListaLivros";
import LivrosDisponiveis from "./components/LivrosDisponiveis";
import axios from "axios";
import "./App.css";

function App() {
  const [livros, setLivros] = useState([]);
  const [atualizar, setAtualizar] = useState(false);

  useEffect(() => {
    // Buscar livros no backend
    axios.get("http://localhost:8080/livros")
      .then(res => setLivros(res.data))
      .catch(err => console.error(err));
  }, [atualizar]);

  const handleLivroAdicionado = () => {
    setAtualizar(!atualizar);
  };

  // Função para remover livro
  const handleRemoverLivro = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/livros/${id}`);
      setAtualizar(!atualizar);
    } catch (error) {
      console.error("Erro ao remover livro:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Biblioteca</h1>
      <FormularioLivro onLivroAdicionado={handleLivroAdicionado} />
      <div style={{ display: "flex", gap: "20px" }}>
        <ListaLivros livros={livros} setAtualizar={setAtualizar} atualizar={atualizar} />
        <LivrosDisponiveis livros={livros} onRemoverLivro={handleRemoverLivro} />
      </div>
    </div>
  );
}

export default App;
