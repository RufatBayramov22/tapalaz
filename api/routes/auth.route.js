import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { refreshAuthMiddleware } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshAuthMiddleware, (req, res) => {
    const newAccessToken = jwt.sign(
      { username: req.userId }, // Kullanıcı bilgilerini kullan
      process.env.JWT_SECRET_KEY, // Gizli anahtar
      { expiresIn: "1m" } // Yeni erişim token süresi
    );
  
    res.json({ accessToken: newAccessToken });
  });
  

export default router;
