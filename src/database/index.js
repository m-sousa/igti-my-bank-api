const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://igti-my-bank-api:${process.env.DB_PSW}@cluster0-02xcb.mongodb.net/my-bank?retryWrites=true&w=majority`,
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then((a) => {
    console.log("Conectado a base de dados");
  })
  .catch((err) => {
    console.log(`Erro ao conectar na base de dados: ${err}`);
  });

mongoose.Promisse = global.Promisse;

module.exports = mongoose;
