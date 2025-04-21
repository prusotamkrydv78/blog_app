import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
const connectionString = process.env.CONNECTION_STRING;

const app = express();

// connecting to the databse

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Database connected successfully!!");
  })
  .catch((err) => console.log("Database faild to connect", err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
