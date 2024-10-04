import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import userRoute from "./routes/user.route.js";

dotenv.config();
const app = express();

// Helmet ile güvenlik başlıklarını ayarlayın
app.use(helmet());

// CORS Configuration
const allowedOrigins = ["https://tapal.az", "http://localhost:3000"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Çerezleri kabul et
  })
);

// Enable pre-flight requests for all routes
app.options("*", cors());

// Body parser ve cookie parser middleware'lerini ekleyin
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRoute);
app.use("/posts", postRoute);
app.use("/users", userRoute);

// Anasayfa
app.get("/", (req, res) => {
  res.send("Hello");
});

// 404 Hata Yönetimi
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

// MongoDB Bağlantısı
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
};

connectDB();

// Sunucu dinleme
const PORT = process.env.PORT || 8800; // PORT'u çevresel değişkenlerden alın
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
