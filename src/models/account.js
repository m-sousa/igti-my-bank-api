const mongoose = require("../database");

const AccountSchema = new mongoose.Schema({
  agencia: {
    type: Number,
    required: true,
  },
  conta: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  balance: {
    type: Number,
    required: true,
    min: [0, "Deu ruim"],
  },
});

const Account = mongoose.model("account", AccountSchema);

module.exports = Account;
