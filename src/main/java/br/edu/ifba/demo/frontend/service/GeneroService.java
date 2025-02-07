package br.edu.ifba.demo.frontend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import br.edu.ifba.demo.frontend.dto.GeneroDTO;

@Service
public class GeneroService {

    private final WebClient webClient;

    public GeneroService(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<GeneroDTO> listAllGeneros() {
        return webClient.get()
                .uri("/genero/listall")
                .retrieve()
                .bodyToFlux(GeneroDTO.class)
                .collectList()
                .block();
    }
}