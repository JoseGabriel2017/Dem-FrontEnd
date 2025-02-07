package br.edu.ifba.demo.frontend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import br.edu.ifba.demo.frontend.dto.LivroDTO;
import reactor.core.publisher.Mono;

@Service
public class LivroService {
    @Autowired
    private WebClient webClient;

    public List<LivroDTO> listAllLivros(){
        Mono<List<LivroDTO>> listObj = this.webClient
            .method(HttpMethod.GET)
            .uri("livro/listall")
            .retrieve()
            .bodyToFlux(LivroDTO.class)
            .collectList();
        
        List<LivroDTO> list = listObj.block();
        return list;
    }

    public boolean delete(Long id_livro){
        Mono<LivroDTO> obj = this.webClient
            .method(HttpMethod.DELETE)  
            .uri("livro/{id}", id_livro)
            .retrieve()
            .bodyToMono(LivroDTO.class);
        
        LivroDTO usu = obj.block();
        if (usu!=null) {
            return true;
        }
        return false;
    }

    public boolean salvarOuAtualizar(LivroDTO livroDTO){
        Mono<LivroDTO> obj = this.webClient
            .method(HttpMethod.POST)  
            .uri("livro", livroDTO)
            // .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .bodyValue(livroDTO)
            .retrieve()
            .bodyToMono(LivroDTO.class);
        
        LivroDTO livro = obj.block();
        if (livro!=null) {
            return true;
        }
        return false;
    }

    public LivroDTO getById(Long id_livro){
        Mono<LivroDTO> monoObj = this.webClient
        .method(HttpMethod.GET)
        .uri("livro/getById/{id}", id_livro) // Path variable
        .retrieve()
        .bodyToMono(LivroDTO.class); // Retorna um Mono<LivroDTO>
    
        // Converte a chamada reativa em chamada bloqueante (sincronamente):
        LivroDTO livro = monoObj.block();
        return livro;
    }

}
