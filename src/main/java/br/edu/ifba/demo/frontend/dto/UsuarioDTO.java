package br.edu.ifba.demo.frontend.dto;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class UsuarioDTO {
    private Long id_usuario;
	private String login;
	private String senha;
	private Timestamp create_at;
	private Timestamp last_login;
}

