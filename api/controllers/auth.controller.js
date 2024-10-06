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
    res
      .status(500)
      .json({ message: "Failed to create user!", error: err.message });
  }
};

// LOGIN FUNCTION

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Kullanıcıyı veritabanında bul
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    // Parola doğrulama
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    // Token'in geçerlilik süresi (7 gün)
    const age = 7 * 24 * 60 * 60; // saniye cinsinden

    // Token oluşturma
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin || false, // Kullanıcının admin olup olmadığını belirle
      },
      process.env.JWT_SECRET_KEY, // JWT için gizli anahtar
      { expiresIn: age } // Token geçerlilik süresi
    );

    // Şifreyi kullanıcı bilgisinden hariç tut
    const { password: userPassword, ...userInfo } = user.toObject();

    // Cookie'ye token ekle
    res
      .cookie("token", token, {
        httpOnly: true, // Tarayıcıda yalnızca HTTP istekleriyle erişilebilir
        secure: process.env.NODE_ENV === "production", // Üretimde yalnızca HTTPS üzerinden kullanılacak
        maxAge: age * 1000, // Cookie geçerlilik süresi (milisaniye cinsinden)
        sameSite: "strict", // CSRF saldırılarına karşı güvenlik
      })
      .status(200)
      .json({ token, ...userInfo }); // Kullanıcı bilgilerini ve token'ı döndür

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};

// LOGOUT FUNCTION
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
