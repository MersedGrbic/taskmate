const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const taskRouter = require("./Routes/todoItems");
const app = express();

//express.json to get data into json format
app.use(express.json());

//defining PORT from .env
const PORT = 3500 || process.env.VITE_PORT;

app.use(cors());
//Importing routes
const todoItemRoutes = require("./Routes/todoItems");
//connecting to mongoDB
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.VITE_DB_CONNECT)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.use("/", todoItemRoutes);
//connectin to server
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
