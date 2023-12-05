//env setup
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const URL = process.env.DB_CONNECTOIN;
const DB_NAME = process.env.DB_NAME;

//require's
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//app usage
const app = express();
app.use(cors());
app.use(express.json());

//database connection
mongoose
  .connect(URL, { dbName: DB_NAME })
  .then(
    app.listen(PORT, () => {
      console.log(
        `connected to the database and port opened on http://localhost:${PORT}`
      );
    })
  )
  .catch((err) => {
    console.log("could not connected to the database", err);
  });
