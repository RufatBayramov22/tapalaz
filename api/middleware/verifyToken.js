import jwt from "jsonwebtoken";

// // Yetkilendirme Middleware
// export const authMiddleware = (req, res, next) => {
//   const token = req.cookies.token; // Token'ı cookie'den al
  
//   if (!token) {
//     return res.status(401).json({ message: 'No token provided, authorization denied' });
//   }

//   console.log("Token:", token); // Log the token for debugging
//   console.log("JWT Secret Key:", process.env.JWT_SECRET_KEY); // Log secret key for debugging
  
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Token'ı doğrula
//     req.userId = decoded.id; // Kullanıcı kimliğini ata
//     next(); // Bir sonraki middleware veya route handler'a geç
//   } catch (err) {
//     console.error("Token validation error:", err); // Hata mesajını yazdır
//     return res.status(401).json({ message: 'Token is not valid' });
//   }
// }; 
// Access Token Middleware
export const authMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken; // Access token'ı cookie'den al
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  console.log("Access Token:", token); // Token'ı logla
  console.log("JWT Secret Key:", process.env.JWT_SECRET_KEY); // Secret key'i logla
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Token'ı doğrula
    req.userId = decoded.userId; // Kullanıcı adını ata (veya decoded.id, senin yapına bağlı)
    next(); // Bir sonraki middleware veya route handler'a geç
  } catch (err) {
    console.error("Access Token validation error:", err); // Hata mesajını yazdır
    return res.status(401).json({ message: 'Access token is not valid' });
  }
};

// Refresh Token Middleware
export const refreshAuthMiddleware = (req, res, next) => {
  const token = req.cookies.refreshToken; // Refresh token'ı cookie'den al
  
  if (!token) {
    return res.status(401).json({ message: 'No refresh token provided, authorization denied' });
  }

  console.log("Refresh Token:", token); // Token'ı logla
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY); // Refresh token'ı doğrula
    req.userId = decoded.userId; // Kullanıcı adını ata
    next(); // Bir sonraki middleware veya route handler'a geç
  } catch (err) {
    console.error("Refresh Token validation error:", err); // Hata mesajını yazdır
    return res.status(401).json({ message: 'Refresh token is not valid' });
  }
};
