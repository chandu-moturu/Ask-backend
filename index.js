import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";
import chatRoutes from './routes/Chat.js';
import dotenv from "dotenv";



const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", entended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);
app.use("/chat", chatRoutes);
app.get('/',(req,res) =>{
  res.send("server is running")
})




const PORT = process.env.PORT_NO;
const DATABASE_URI = process.env.CONNECTION_URI;
mongoose
  .connect(DATABASE_URI, { useNewURlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err.message);
  });
