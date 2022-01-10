const express = require("express");
const app = express();
const env = require("dotenv");
env.config();

// db connection
const { dbConnection } = require("./middlewares/connection");
dbConnection();

// middlewares
app.use(express.urlencoded())
app.use(express.json());

const { userRoutes } = require("./router/user.router");
const { toDoRoutes } = require("./router/toDo.router");

app.use('/user',userRoutes)
app.use('/todo',toDoRoutes)


app.listen(3000, () => {
  console.log("server is running on 3000");
});
