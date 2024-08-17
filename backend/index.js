import express from "express";
// import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from 'path';
import cors from "cors";
// import logger from 'morgan';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import { app, server } from "./socket/socket.js";
const PORT = process.env.port || 3000;
const __dirname = path.resolve();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

// define the route
app.get("/", (req, res) => {
  res.send(`<h1 style="color: green;">Hello Gfg!</h1>`);
});

server.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
