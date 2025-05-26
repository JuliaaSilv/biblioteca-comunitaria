package com.biblioteca.livros.service;

import com.biblioteca.livros.model.Livro;
import com.biblioteca.livros.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LivroService {
    @Autowired
    private LivroRepository livroRepository;

    public List<Livro> listarTodos() {
        return livroRepository.findAll();
    }

    public Livro adicionarLivro(Livro livro) {
        livro.setStatus("DISPONIVEL");
        return livroRepository.save(livro);
    }

    public Livro atualizarStatus(Long id, String status) {
        Livro livro = livroRepository.findById(id).orElseThrow();
        livro.setStatus(status);
        return livroRepository.save(livro);
    }
}