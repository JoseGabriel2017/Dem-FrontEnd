package br.edu.ifba.demo.frontend.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String usuario;
    private String senha;

}
