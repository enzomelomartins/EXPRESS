import livro from '../models/Livro.js';
import { autor } from '../models/Autor.js';

class LivroController {
    
    static async listaLivros(req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };
    
    static async listaLivroPorId(req, res) {
        try {
            const livroEncontrado = await livro.findById(req.params.id);
            res.status(200).json(livroEncontrado);
        } catch (error) {
            res.status(500).json({message: `${error.message} - livro não encontrado`});
        }
    };
    
    
    static async cadastrarLivros(req, res) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            let autorId = autorEncontrado._id;
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc} };
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({ message: "Criado com sucesso", livro: livroCriado });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha ao cadastrar livro` });
        }
    }

    static async atualizarLivro(req, res) {
        try {
            await livro.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({message: "Livro atualizado com sucesso", livro: req.body});
        } catch (error) {
            res.status(500).json({message: `${error.message} - falha ao atualizar livro`});
        }
    };

    static async excluirLivro(req, res) {
        try {
            await livro.findByIdAndDelete(req.params.id);
            res.status(200).json({message: "Livro excluído com sucesso", livro: req.params.id});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    };

    static async listaLivrosPorEditor(req, res) {
    
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await livro.find({editora: editora});
            res.status(200).json(livrosPorEditora);
        } catch (error) {
            res.status(500).json({message: `${error.message} - falha na busca por editora`});
        }
    }
};

export default LivroController;