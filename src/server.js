const express = require("express");
const cors = require("cors");

const port = 3333;
const app = express();

app.use(express.json());
app.use(cors());

require("./controllers/accountController")(app);

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
