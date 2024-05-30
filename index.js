// packages
const express = require('express')
const cors = require ("cors")
// const cookieParser = require ("cookie-parser")

// configs
const app = express();
require('dotenv').config()
// app.use(express.json())

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PATCH"]
  })
);
// app.use(cookieParser());

// Temp Routes
app.use("/sajak", require('./temp/sajakRoutes/index'));
app.use("/surya", require('./temp/suryaRoutes/index'));


// TODO: standard routes
// app.use("/marketplace", require("./router/marketplaceRoute.js"));
// app.use("/auth", require("./router/authRoute.js"));

// hosting
const port = process.env.port || 8080;
app.listen(port, () => console.log("server is listening in the port:", port));