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
    console.error("Error details:", err); 
    res
      .status(500)
      .json({ message: "Failed to create user!", error: err.message });
  }
};


// Giriş Fonksiyonu
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // KULLANICININ VARLIĞINI KONTROL ET
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    // ŞİFRENİN DOĞRULUĞUNU KONTROL ET
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    // TOKEN'IN SÜRESİNİ TANIMLA
    const age = 1000 * 60 * 60 * 24 * 7; // 7 gün

    // TOKEN OLUŞTUR VE KULLANICI BİLGİLERİYLE GÖNDER
    const token = jwt.sign(
      { id: user._id, isAdmin: true },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user.toObject();

    // Token'ı çerez olarak ayarla ve yanıtı gönder
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS kullanılıyorsa bu satırı aç
      maxAge: age,
    })
    .status(200)
    .json({ token, user: userInfo }); // Token ve kullanıcı bilgilerini gönder
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};

// LOGOUT FUNCTION
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
