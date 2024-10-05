import jwt from "jsonwebtoken";

// Yetkilendirme Middleware
export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // Token'ı cookie'den al
  console.log(req.cookies.token)
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Token'ı doğrula
    req.userId = decoded.id; // Kullanıcı kimliğini ata
    next(); // Bir sonraki middleware veya route handler'a geç
  } catch (err) {
    console.error("Token validation error:", err); // Hata mesajını yazdır
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
