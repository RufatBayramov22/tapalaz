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

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    // ŞİFRENİN DOĞRULUĞUNU KONTROL ET
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }


    // GENERATE COOKIE TOKEN AND SEND TO THE USER
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    // response'da token'ı da göndermeyi unutmayın
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
      })
      .status(200)
      .json({ token, ...userInfo }); // Burada token'ı ekliyoruz
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to login!" });
  }
};

// LOGOUT FUNCTION
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
