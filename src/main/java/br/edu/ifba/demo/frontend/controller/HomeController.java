package br.edu.ifba.demo.frontend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import br.edu.ifba.demo.frontend.dto.UsuarioDTO;
import br.edu.ifba.demo.frontend.service.UsuarioService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class HomeController {
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/")
    public ModelAndView index() {
        List<UsuarioDTO> usuarios = usuarioService.listAllUsuarios();
        ModelAndView mv = new ModelAndView();
        usuarios.getFirst().getId_usuario();
        mv.addObject("usuarios", usuarios);
        mv.setViewName("index");
        return mv;
    }

    @GetMapping("/delete/{id}")
    public ModelAndView delete(@PathVariable int id) {
        boolean valor = usuarioService.delete(id);
        ModelAndView mv = new ModelAndView();
        mv.addObject("delete", valor);
        mv.setViewName("index");
        return mv;
    }
    

}
