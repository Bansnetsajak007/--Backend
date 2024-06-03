// packages
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {config} from "dotenv"


// routes
import marketplaceRoute from './router/marketplaceRoute.js'
import authRoute from './router/authRoute.js'
import connectDB from './config/dbConfig.js'
import blogsRoute from './router/blogsRoute.js'

// configs
const app = express();
config()
app.use(express.json())

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PATCH"]
  })
);
app.use(cookieParser());

// Temp Routes
// app.use("/sajak", require('./temp/sajakRoutes/index'));
// app.use("/surya", require('./temp/suryaRoutes/index'));


// standard routes
app.use("/auth", authRoute);
app.use("/marketplace", marketplaceRoute);
app.use("/blog", blogsRoute);

// hosting
const PORT = 6000;
// app.listen(PORT, async() => {
//   await connectDB();
//   console.log("server is listening in the port: ", PORT);
// })

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})
})