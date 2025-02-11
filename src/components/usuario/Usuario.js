import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './Usuario.css';

const Usuario = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [editando, setEditando] = useState(null);

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const carregarUsuarios = async () => {
        try {
            const response = await api.get('/usuario/listall');
            setUsuarios(response.data);
        } catch (error) {
            console.error('Erro ao carregar usuários', error);
        }
    };

    const adicionarUsuario = async () => {
        try {
            const response = await api.post('/usuario', { login, senha });
            setUsuarios([...usuarios, response.data]);
            limparCampos();
        } catch (error) {
            console.error('Erro ao adicionar usuário', error);
        }
    };

    const editarUsuario = (id) => {
        const usuario = usuarios.find(u => u.id === id);
        setLogin(usuario.login);
        setSenha(usuario.senha);
        setEditando(id);
    };

    const atualizarUsuario = async () => {
        try {
            await api.put(`/usuario/${editando}`, { login, senha });
            carregarUsuarios();
            limparCampos();
            setEditando(null);
        } catch (error) {
            console.error('Erro ao atualizar usuário', error);
        }
    };

    const deletarUsuario = async (id) => {
        try {
            await api.delete(`/usuario/${id}`);
            carregarUsuarios();
        } catch (error) {
            console.error('Erro ao deletar usuário', error);
        }
    };

    const limparCampos = () => {
        setLogin('');
        setSenha('');
    };

    return (
        <div className="usuario-container">
            <h1>Gerenciamento de Usuários</h1>
            <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Login" />
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" />
            {editando ? (
                <button onClick={atualizarUsuario}>Atualizar</button>
            ) : (
                <button onClick={adicionarUsuario}>Adicionar</button>
            )}
            <ul>
                {usuarios.map(usuario => (
                    <li key={usuario.id}>
                        {usuario.login}
                        <button onClick={() => editarUsuario(usuario.id)}>Editar</button>
                        <button onClick={() => deletarUsuario(usuario.id)}>Deletar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Usuario;