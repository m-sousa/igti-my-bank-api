const express = require("express");
const Account = require("../models/account");
const mongoose = require("../database");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const accounts = await Account.find().exec();
    return res.send(accounts);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// questão 04
router.put("/deposit", async (req, res) => {
  try {
    const { conta, agencia, value } = req.body;
    const query = { conta, agencia };

    if (value <= 0)
      return res
        .status(400)
        .send({ message: "Value must be greater then zero." });

    const account = await Account.findOne(query);

    if (!account)
      return res.status(404).send({ message: "Account not found." });

    const newBalance = {
      balance: account.balance + value,
    };

    Account.updateOne(query, newBalance).exec();

    return res.send(newBalance);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
});

// Questão 05
router.put("/withdraw", async (req, res) => {
  try {
    const { conta, agencia, value } = req.body;
    const query = { conta, agencia };

    if (value <= 0)
      return res
        .status(400)
        .send({ message: "Value must be greater then zero." });

    const account = await Account.findOne(query);

    if (!account)
      return res.status(404).send({ message: "Account not found." });

    const valueWithTax = value + 1;

    const newBalance = {
      balance: account.balance - valueWithTax,
    };

    if (newBalance.balance < 0)
      return res.status(404).send({ message: "Insufficient funds." });

    Account.updateOne(query, newBalance).exec();

    return res.send(newBalance);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
});

// Questão 06
router.get("/balance/:agencia/:conta", async (req, res) => {
  try {
    const { agencia, conta } = req.params;
    const account = await Account.findOne({ agencia, conta });

    if (!account)
      return res.status(404).send({ message: "Account not found." });

    return res.send({ balance: account.balance });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
});

// Questão 07
router.delete("/:agencia/:conta", async (req, res) => {
  try {
    const { agencia, conta } = req.params;
    await Account.deleteOne({ agencia, conta }).exec();
    const activeAcounts = await Account.countDocuments({ agencia });
    return res.send({ activeAcounts });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
});

module.exports = (app) => app.use("/account", router);
