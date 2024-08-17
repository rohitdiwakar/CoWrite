import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from 'path';
import cors from "cors";
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import { app, server } from "./socket/socket.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
dotenv.config();
const PORT = process.env.port || 3000;
const __dirname = path.resolve();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "/frontend/dist")));


app.use("/", indexRouter);
app.use("/users", usersRouter);


app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


// define the route
app.get("/", (req, res) => {
  res.send(`<h1 style="color: green;">Hello Gfg!</h1>`);
});

server.listen(PORT, () => {
  // connectToMongoDB();
  console.log(`Server is listening at http://localhost:${PORT}`);
});
