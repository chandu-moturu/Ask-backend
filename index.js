import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";
import chatRoutes from './routes/Chat.js';
import dotenv from "dotenv";
import colors from "colors";
// import {notFound,errorHandler} from "./middlewares/errorMiddleware.js";


const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", entended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);
app.use("/chat", chatRoutes);

// app.use(notFound);
// app.use(errorHandler);


const PORT = process.env.PORT_NO;
const DATABASE_URI = process.env.CONNECTION_URI;
mongoose
  .connect(DATABASE_URI, { useNewURlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`.magenta.bold);
    })
  )
  .catch((err) => {
    console.log(err.message);
  });
