package br.edu.ifba.demo.frontend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import br.edu.ifba.demo.frontend.dto.UsuarioDTO;
import reactor.core.publisher.Mono;

@Service
public class UsuarioService {
    @Autowired
    private WebClient webClient;

    public List<UsuarioDTO> listAllUsuarios(){
        Mono<List<UsuarioDTO>> usuarioList = this.webClient
            .method(HttpMethod.GET)
            .uri("usuario/listall")
            .retrieve()
            .bodyToFlux(UsuarioDTO.class)
            .collectList();
        
        List<UsuarioDTO> list = usuarioList.block();
        return list;
    }

    public boolean delete(int id_usuario){
        Mono<UsuarioDTO> usuarioList = this.webClient
            .method(HttpMethod.DELETE)  
            .uri("usuario/{id}", id_usuario)
            .retrieve()
            .bodyToMono(UsuarioDTO.class);
        
        UsuarioDTO usu = usuarioList.block();
        if (usu!=null) {
            return true;
        }
        return false;

    }


}
