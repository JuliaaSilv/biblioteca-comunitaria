package controller;


import model.Livro;
import service.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/livros")
@CrossOrigin(origins = "http://localhost:3000")
public class LivroController {
    @Autowired
    private LivroService livroService;

    @GetMapping
    public List<Livro> listarLivros() {
        return livroService.listarTodos();
    }

    @PostMapping
    public Livro adicionarLivro(@RequestBody Livro livro) {
        return livroService.adicionarLivro(livro);
    }

    @PutMapping("/{id}/status")
    public Livro atualizarStatus(@PathVariable Long id, @RequestParam String status) {
        return livroService.atualizarStatus(id, status);
    }
}