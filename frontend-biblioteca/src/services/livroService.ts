export {};

// src/services/livroService.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Back-end Spring Boot
});

export const getLivros = () => api.get("/livros");

export const adicionarLivro = (livro: {
  titulo: string;
  autor: string;
  categoria: string;
  status: string;
}) => api.post("/livros", livro);

export const atualizarStatus = (id: number, status: string) =>
  api.put(`/livros/${id}/status?status=${status}`);
