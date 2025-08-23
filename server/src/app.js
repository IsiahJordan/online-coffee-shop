const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use(helmet());

app.use("/api", routes);

module.exports = app;
