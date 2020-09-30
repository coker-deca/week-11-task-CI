import createError from "http-errors";
import express, {Request, Response, NextFunction} from "express";
import path from "path";
import logger from "morgan";

require("dotenv").config();


import { graphqlHTTP } from "express-graphql";
import schema from './schema/schema';
import root from "./controllers/resolvers";
import {decodeToken} from "./controllers/register-login"
import bodyParser from "body-parser";
import mongoose from "mongoose";


const SECRET =  process.env["JWT_SECRET"];
var app = express();

const addUser = async (req: any, res: Response, next: NextFunction) => {
  let token = req.headers.authorization!;
  const user = decodeToken(token);
  req.context = user;
  next();
};


mongoose
  .connect(
    "mongodb+srv://Db-Admin:Db-Admin@decadev-space.r9psq.mongodb.net/week11db",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(function dbConnect() {
    console.log("Connected to Database...");
  })
  .catch(function dbConnectError(err) {
    console.error("Could not connect to database...", err);
  });



app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../", "public")));

app.use(
  "/graphql",
  bodyParser.json(),
  graphqlHTTP( (req:any) => ({
    schema: schema,
    rootValue: root,
    graphiql: true,
    context: req.context,
  })),
);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: createError.HttpError,
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
