import express from 'express';
import conectaNaDatabase from './config/dbConnect.js';
import livro from "./models/Livro.js";

const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
  console.error("Erro ao conectar no MongoDB", erro);
});

conexao.once("open", () => {
  console.log("Conectado no MongoDB");
});

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send("Curso de Node.js");
});

app.get('/livros', async (req, res) => {
  const listaLivros = await livro.find({});
  res.status(200).json(listaLivros);
});

app.get('/livros/:id', (req, res) => {
  const index = buscaLivro(req.params.id);
  if (index < 0) {
    res.status(404).json("Livro não encontrado");
  } else {
    res.status(200).json(livros[index]);
  }
});

app.post('/livros', (req, res) => {
  livros.push(req.body);
  res.status(201).json("Livro criado com sucesso");
});

app.put('/livros/:id', (req, res) => {
  const index = buscaLivro(req.params.id);
  if (index < 0) {
    res.status(404).json("Livro não encontrado");
  } else {
    livros[index] = req.body;
    res.status(200).json("Livro atualizado com sucesso");
  }
});

app.delete('/livros/:id', (req, res) => {
  const index = buscaLivro(req.params.id);
  if (index < 0) {
    res.status(404).json("Livro não encontrado");
  } else {
    livros.splice(index, 1);
    res.status(200).json("Livro removido com sucesso");
  }
});

export default app;