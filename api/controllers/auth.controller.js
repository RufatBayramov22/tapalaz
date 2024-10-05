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
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Şifreyi karşılaştır
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Token'ları oluştur
    const accessToken = jwt.sign(
      { userId: user._id }, // MongoDB ObjectId'sini kullan
      process.env.JWT_SECRET_KEY, // Gizli anahtar
      { expiresIn: "1m" } // Access token süresi
    );

    const refreshToken = jwt.sign(
      { userId: user._id }, // MongoDB ObjectId'sini kullan
      process.env.JWT_REFRESH_SECRET_KEY, // Refresh token için ayrı gizli anahtar
      { expiresIn: "5m" } // Refresh token süresi
    );

    // Token'ları cookie olarak ayarla
    res.cookie("accessToken", accessToken, { maxAge: 60000, httpOnly: true });
    res.cookie("refreshToken", refreshToken, { maxAge: 300000, httpOnly: true, secure: true, sameSite: "strict" });

    // Kullanıcı bilgilerini ve token'ları döndür
    res.json({
      message: "Login Successful",
      user: {
        username: user.username,
        phoneNumber: user.phoneNumber
      },
      accessToken, // Yeni access token
      refreshToken // Yeni refresh token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
};
// export const login = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username });

//     if (!user) return res.status(400).json({ message: "Invalid Credentials!" });

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid)
//       return res.status(400).json({ message: "Invalid Credentials!" });

//     const age = 1000 * 60 * 60 * 24 * 7; // 7 gün

//     // Token'ı oluştur
//     const token = jwt.sign(
//       {
//         id: user._id,
//         isAdmin: false,
//       },
//       process.env.JWT_SECRET_KEY, // Gizli anahtar
//       { expiresIn: age }
//     );

//     const { password: userPassword, ...userInfo } = user.toObject();

//     res.cookie("token", token, {
//       httpOnly: true,
//       maxAge: age,
//     })
//     .status(200)
//     .json({ token, ...userInfo });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to login!" });
//   }
// };
// LOGOUT FUNCTION
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
