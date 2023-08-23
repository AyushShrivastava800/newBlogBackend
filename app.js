import express from "express";
import "./model/Connection.js";
import userRouter from "./routes/UserRouter.js";
import bodyParser from "body-parser";
import cors from "cors";

var app = express();

  
app.use(bodyParser());
app.use(cors());
app.use("/user", userRouter);

const port = 3001;
app.listen(port);
console.log(`server invoked at link http://localhost:${port}`);
