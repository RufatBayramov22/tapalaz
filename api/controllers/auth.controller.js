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
    // KULLANICININ VAR OLUP OLMADIĞINI KONTROL ET
    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ message: "Invalid Credentials!" });

    // ŞİFRENİN DOĞRULUĞUNU KONTROL ET
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid Credentials!" });

    // Token'ı oluşturmak için gerekli süreyi tanımlayın
    const accessTokenAge = 1000 * 60 * 60; // 1 saat
    const refreshTokenAge = 1000 * 60 * 60 * 24 * 7; // 7 gün

    // Erişim token'ını oluştur
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: accessTokenAge }
    );

    // Yenileme token'ını oluştur
    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_REFRESH_SECRET_KEY, // Farklı bir secret key kullanmalısınız
      { expiresIn: refreshTokenAge }
    );

    const { password: userPassword, ...userInfo } = user.toObject();

    // Erişim token'ını cookie'ye yaz
    res.cookie("token", accessToken, {
      httpOnly: true,
      maxAge: accessTokenAge,
      // secure: true, // Eğer HTTPS kullanıyorsanız bu satırı açın
    });

    // Yenileme token'ını cookie'ye yaz
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: refreshTokenAge,
      // secure: true, // Eğer HTTPS kullanıyorsanız bu satırı açın
    });

    // Kullanıcı bilgilerini ve erişim token'ını yanıtla
    res.status(200).json({ token: accessToken, ...userInfo });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};
// LOGOUT FUNCTION
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
