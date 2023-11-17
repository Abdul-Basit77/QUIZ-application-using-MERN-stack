const mongoose = require("mongoose");

const QueAnsSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    que: { type: String, required: true },
    choices: { type: Array },
    answer: { type: Array, required: true }, 
    score: { type: Number, required: true },
  },
  {
    collection: "QueAns",
  }
);

mongoose.model("QueAns", QueAnsSchema);

