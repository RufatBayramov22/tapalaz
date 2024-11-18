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
  res.status(404).json({ message: "Not Found" });
});

// Hata Yönetimi Middleware'i
app.use((err, req, res, next) => {
  console.error("Hata:", err.message);
  res.status(err.status || 500).json({ message: "Bir hata oluştu", error: err.message });
});

// MongoDB Bağlantısı
const connectDB = async (retries = 5) => {
  while (retries) {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("MongoDB connected successfully");
      break;
    } catch (err) {
      console.error("MongoDB connection failed:", err);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      await new Promise(res => setTimeout(res, 5000)); // 5 saniye bekle
    }
  }
};

connectDB();

// Sunucu dinleme
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
