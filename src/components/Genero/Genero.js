import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './Genero.css';

const Genero = () => {
    const [generos, setGeneros] = useState([]);
    const [nome, setNome] = useState('');
    const [editando, setEditando] = useState(null);

    useEffect(() => {
        carregarGeneros();
    }, []);

    const carregarGeneros = async () => {
        try {
            const response = await api.get('/genero/listall');
            setGeneros(response.data);
        } catch (error) {
            console.error('Erro ao carregar gêneros', error);
        }
    };

    const adicionarGenero = async () => {
        try {
            const response = await api.post('/genero', { nome });
            setGeneros([...generos, response.data]);
            setNome('');
        } catch (error) {
            console.error('Erro ao adicionar gênero', error);
        }
    };

    const editarGenero = (id) => {
        const genero = generos.find(g => g.id === id);
        setNome(genero.nome);
        setEditando(id);
    };

    const atualizarGenero = async () => {
        try {
            await api.put(`/genero/${editando}`, { nome });
            carregarGeneros();
            setNome('');
            setEditando(null);
        } catch (error) {
            console.error('Erro ao atualizar gênero', error);
        }
    };

    const deletarGenero = async (id) => {
        try {
            await api.delete(`/genero/${id}`);
            carregarGeneros();
        } catch (error) {
            console.error('Erro ao deletar gênero', error);
        }
    };

    return (
        <div className="genero-container">
            <h1>Gerenciamento de Gêneros</h1>
            <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Nome do Gênero"
            />
            {editando ? (
                <button onClick={atualizarGenero}>Atualizar</button>
            ) : (
                <button onClick={adicionarGenero}>Adicionar</button>
            )}
            <ul>
                {generos.map(genero => (
                    <li key={genero.id}>
                        {genero.nome}
                        <button onClick={() => editarGenero(genero.id)}>Editar</button>
                        <button onClick={() => deletarGenero(genero.id)}>Deletar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Genero;