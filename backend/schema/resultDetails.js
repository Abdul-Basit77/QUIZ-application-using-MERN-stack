const mongoose = require("mongoose");

const ResultScehma = new mongoose.Schema(
    {
      name: {type: String, required: true},
      topic: { type: String, unique: true },
      obScore: Number,
    },
    {
      collection: "Result",
    }
  );
  
  mongoose.model("Result", ResultScehma);