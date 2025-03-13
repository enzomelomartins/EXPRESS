import livro from '../models/Livro.js';

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


    static async cadastrarLivro (req, res) {
        const novoLivro = new livro(req.body);
        try {
            await novoLivro.save();
            res.status(201).json(novoLivro);
        } catch (error) {
            res.status(400).json({message: `${error.message} - falha ao cadastrar livro` });
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


};

export default LivroController;