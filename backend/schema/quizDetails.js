const mongoose = require('mongoose');

const QueDetailSchema = new mongoose.Schema({
  type: String,
  question: String,
  choices: [String],
  correctAnswers: [String],
  score: Number,
});

const QueAnsSchema = new mongoose.Schema(
{
  topic: String,
  totalQuestions: Number,
  totalScore: Number,
  totalTime: Number,
  questions: [QueDetailSchema],
},
{
   collection: "QueAns",
}
);

mongoose.model("QueAns", QueAnsSchema);

