import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './Livro.css';

const Livro = () => {
    const [livros, setLivros] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [editora, setEditora] = useState('');
    const [anoPublicacao, setAnoPublicacao] = useState('');
    const [isbn, setIsbn] = useState('');
    const [numPaginas, setNumPaginas] = useState('');
    const [sinopse, setSinopse] = useState('');
    const [idioma, setIdioma] = useState('');
    const [preco, setPreco] = useState('');
    const [editando, setEditando] = useState(null);

    useEffect(() => {
        carregarLivros();
    }, []);

    const carregarLivros = async () => {
        try {
            const response = await api.get('/livro/listall');
            setLivros(response.data);
        } catch (error) {
            console.error('Erro ao carregar livros', error);
        }
    };

    const adicionarLivro = async () => {
        try {
            const response = await api.post('/livro', {
                titulo,
                autor,
                editora,
                anoPublicacao,
                isbn,
                numPaginas,
                sinopse,
                idioma,
                preco
            });
            setLivros([...livros, response.data]);
            limparCampos();
        } catch (error) {
            console.error('Erro ao adicionar livro', error);
        }
    };

    const editarLivro = (id) => {
        const livro = livros.find(l => l.id === id);
        setTitulo(livro.titulo);
        setAutor(livro.autor);
        setEditora(livro.editora);
        setAnoPublicacao(livro.anoPublicacao);
        setIsbn(livro.isbn);
        setNumPaginas(livro.numPaginas);
        setSinopse(livro.sinopse);
        setIdioma(livro.idioma);
        setPreco(livro.preco);
        setEditando(id);
    };

    const atualizarLivro = async () => {
        try {
            await api.put(`/livro/${editando}`, {
                titulo,
                autor,
                editora,
                anoPublicacao,
                isbn,
                numPaginas,
                sinopse,
                idioma,
                preco
            });
            carregarLivros();
            limparCampos();
            setEditando(null);
        } catch (error) {
            console.error('Erro ao atualizar livro', error);
        }
    };

    const deletarLivro = async (id) => {
        try {
            await api.delete(`/livro/${id}`);
            carregarLivros();
        } catch (error) {
            console.error('Erro ao deletar livro', error);
        }
    };

    const limparCampos = () => {
        setTitulo('');
        setAutor('');
        setEditora('');
        setAnoPublicacao('');
        setIsbn('');
        setNumPaginas('');
        setSinopse('');
        setIdioma('');
        setPreco('');
    };

    return (
        <div className="livro-container">
            <h1>Gerenciamento de Livros</h1>
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" />
            <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} placeholder="Autor" />
            <input type="text" value={editora} onChange={(e) => setEditora(e.target.value)} placeholder="Editora" />
            <input type="number" value={anoPublicacao} onChange={(e) => setAnoPublicacao(e.target.value)} placeholder="Ano de Publicação" />
            <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} placeholder="ISBN" />
            <input type="number" value={numPaginas} onChange={(e) => setNumPaginas(e.target.value)} placeholder="Número de Páginas" />
            <input type="text" value={sinopse} onChange={(e) => setSinopse(e.target.value)} placeholder="Sinopse" />
            <input type="text" value={idioma} onChange={(e) => setIdioma(e.target.value)} placeholder="Idioma" />
            <input type="number" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="Preço" />
            {editando ? (
                <button onClick={atualizarLivro}>Atualizar</button>
            ) : (
                <button onClick={adicionarLivro}>Adicionar</button>
            )}
            <ul>
                {livros.map(livro => (
                    <li key={livro.id}>
                        {livro.titulo} - {livro.autor}
                        <button onClick={() => editarLivro(livro.id)}>Editar</button>
                        <button onClick={() => deletarLivro(livro.id)}>Deletar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Livro;