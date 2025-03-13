import app from "./src/app.js";
import "dotenv/config.js";

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Servidor rodando na porta 3000");
});