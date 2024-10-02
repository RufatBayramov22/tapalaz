

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import userRoute from "./routes/user.route.js";

dotenv.config();
const app = express();

app.use(helmet());

// CORS Configuration
const allowedOrigins = ['https://tapal.az', 'http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
// app.use(cors({
//   origin: allowedOrigins, // Frontend URL
//   credentials: true, // İsteklerdeki çerezleri kabul eder
// }));

// Enable pre-flight requests for all routes
app.options('*', cors());

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRoute);
app.use("/posts", postRoute);
app.use("/users", userRoute);

app.get("/", (req, res) => {
  res.send("Hello");
});

// 404 Error Handling
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }
};

connectDB();

// Server Listening
const PORT = 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
