const express = require("express")
const app = express();

const urlRoutes= require("./routes/url")

const PORT = 8080;

const {connectToMongoDB} = require("./connect");

app.use(express.json());

app.use("/url",urlRoutes);

connectToMongoDB("mongodb://127.0.0.1:27017/short-url?directConnection=true").then(
    () => console.log("MongoDB connected")
);

app.listen(PORT, ()=> console.log(`Server started at  PORT:${PORT}`));