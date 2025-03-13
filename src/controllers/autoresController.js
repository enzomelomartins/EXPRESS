import { autor } from '../models/Autor.js';

class AutorController {

    static async listaLivros(req, res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

        static async listaAutores(req, res) {
            try {
                const listaAutores = await autor.find({});
                res.status(200).json(listaAutores);
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        }

        static async listaAutorPorId(req, res) {
            try {
                const autorEncontrado = await autor.findById(req.params.id);
                res.status(200).json(autorEncontrado);
            } catch (error) {
                res.status(500).json({message: `${error.message} - autor não encontrado`});
            }
        };

        static async cadastrarAutor (req, res) {
            const novoAutor = new autor(req.body);
            try {
                await novoAutor.save();
                res.status(201).json(novoAutor);
            } catch (error) {
                res.status(400).json({message: `${error.message} - falha ao cadastrar autor` });
            }
        }

        static async atualizarAutor(req, res) {
            try {
                await autor.findByIdAndUpdate(req.params.id, req.body);
                res.status(200).json({message: "Autor atualizado com sucesso", autor: req.body});
            } catch (error) {
                res.status(500).json({message: `${error.message} - falha ao atualizar autor`});
            }
        };

        static async excluirAutor(req, res) {
            try {
                await autor.findByIdAndDelete(req.params.id);
                res.status(200).json({message: "Autor excluído com sucesso", autor: req.params.id});
            } catch (error) {
                res.status(500).json({message: error.message});
            }
        };

};

export default AutorController;