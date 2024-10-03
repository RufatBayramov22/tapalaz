

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// REGISTER FUNCTION
export const register = async (req, res) => {
  const { username, password, phoneNumber } = req.body;

  try {
    // HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE A NEW USER AND SAVE TO DB
    const newUser = new User({
      username,
      phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error details:", err); // Daha fazla bilgi için
    res.status(500).json({ message: "Failed to create user!", error: err.message });
  }
};


export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Kullanıcıyı veritabanında bul
    const user = await User.findOne({ username });
    
    // Kullanıcı bulunamadıysa hata döndür
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    // Şifreyi kontrol et (örneğin bcrypt ile)
    const isMatch = await user.comparePassword(password); // Kullanıcı modelinde bir şifre karşılaştırma fonksiyonu eklemeniz gerekebilir
    if (!isMatch) {
      return res.status(401).json({ message: "Geçersiz şifre" });
    }

    // Token oluştur
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h", // Token geçerlilik süresi
    });

    // Cookie'ye token ekle
    res.cookie("token", token, {
      httpOnly: true, // JavaScript ile erişilemez
      secure: process.env.NODE_ENV === "production", // Sadece üretimde HTTPS üzerinden gönderilir
      sameSite: "Strict", // CSRF saldırılarına karşı koruma
    });

    // Başarılı yanıt
    res.status(200).json({ message: "Giriş başarılı!", user: { id: user._id, username: user.username } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Giriş sırasında bir hata oluştu." });
  }
};

// LOGOUT FUNCTION
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
