import express from 'express';
import LivroController from '../controllers/livroController.js';

const routes = express.Router();

routes.get('/livros', LivroController.listaLivros);
routes.get('/livros/busca', LivroController.listaLivrosPorEditor);
routes.get('/livros/:id', LivroController.listaLivroPorId);
routes.post('/livros', LivroController.cadastrarLivros);
routes.put('/livros/:id', LivroController.atualizarLivro);
routes.delete('/livros/:id', LivroController.excluirLivro);


export default routes;