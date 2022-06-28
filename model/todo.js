const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
  task: String, // String is shorthand for {type: String}
  status: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;
