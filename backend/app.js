const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
require("dotenv").config()
const jwt = require("jsonwebtoken");

const mongoUrl=process.env.mongoUrl;
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

//authentication API
require("./schema/userDetails");
const User = mongoose.model("UserInfo");

//signup
app.post("/register", async (req, res) => {
  const { name, email, password,userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 5);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      name,
      email,
      password: encryptedPassword,
      userType,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

//login
app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({email: user.email}, process.env.JWT_SECRET, {
      expiresIn: "60m",
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});

//get user details
app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) { }
});

// question answer API
require("./schema/quizDetails")
const Que = mongoose.model("QueAns");

//uploading quiz
app.post("/uploadQue", async (req, res) => {
  const { topic, totalQuestions, totalScore, totalTime, questions } = req.body;
  try {
    const oldQuiz = await Res.findOne({ topic });
    if (oldQuiz) {
      return res.json({ error: "Quiz by this topic already exists" });
    }
    await Que.create({
      topic,
      totalQuestions,
      totalScore,
      totalTime,
      questions,
    });

    res.json({ status: "ok" });
  } catch (error) {
    console.error("Error in uploading questions:", error);
    console.error(error.stack);
    res.status(500).json({ status: "error", message: "An error occurred. Please try again." });
  }
});

// API to get all available quizzes
app.get("/getQuizzes", async (req, res) => {
  try {
    const quizzes = await Que.find({}, { _id: 1, topic: 1, totalQuestions: 1, totalScore: 1, totalTime: 1 });

    res.json({ status: "ok", quizzes });
  } catch (error) {
    console.error("Error in getting quizzes:", error);
    console.error(error.stack);
    res.status(500).json({ status: "error", message: "An error occurred. Please try again." });
  }
});

// API to get details of a specific quiz by ID
app.get("/getQuiz/:quizTopic", async (req, res) => {
  try {
    const { quizTopic } = req.params;

    const quiz = await Que.findOne({ topic: quizTopic });

    if (!quiz) {
      return res.status(404).json({ status: "error", message: "Quiz not found." });
    }

    res.json({ status: "ok", quiz });
  } catch (error) {
    console.error("Error in getting quiz details:", error);
    console.error(error.stack);
    res.status(500).json({ status: "error", message: "An error occurred. Please try again." });
  }
});

//Result API
require("./schema/resultDetails")
const Res = mongoose.model("Result")

// uploading results
app.post("/result", async (req, res) => {
  const { name, topic, obScore } = req.body;

  try {
    const oldRes = await Res.findOne({ topic });

    if (oldRes) {
      return res.json({ error: "You have already attempted the Quiz" });
    }
    await Res.create({
      name,
      topic,
      obScore,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.listen(5000, () => {
  console.log("Server Started, Connecting to DataBase...");
});
