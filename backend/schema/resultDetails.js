const mongoose = require("mongoose");

const ResultScehma = new mongoose.Schema(
    {
      name: {type: String, required: true},
      quizTopic: { type: String,required: true },
      obScore: {type:Number ,required: true}
    },
    {
      collection: "Result",
      unique: { name: 1, quizTopic: 1 }
    }
  );
  
  mongoose.model("Result", ResultScehma);