require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const port = process.env.PORT ?? 8080;
const hostname = process.env.HOSTNAME ?? "127.0.0.1";
const mongo = process.env.MONGOPORT;

const app = express();
const Todo = require("./model/todo");

async function connectDB(req, res, next) {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:${mongo}/test`);
    next();
  } catch (error) {
    console.log("failed connect db");
    next(error);
  }
}

app.set("view engine", `ejs`);

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/mongo", connectDB, async (req, res, next) => {
  try {
    // const todos = await Todo.create([
    //   { task: "Do the laundry" },
    //   { task: "Take out the trash" },
    //   { task: "Do the math" },
    // ]);
    const todos = await Todo.find({});
    res.render("pages/todos", { todos });
  } catch (error) {
    next(error);
  }
});

app.listen(port, hostname, () => {
  console.log(`Example app listening on ${hostname}:${port}`);
});
