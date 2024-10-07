const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // Cookie'den token al

  if (!token) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid!" });
    }
    req.user = user; // Kullanıcı bilgilerini istek nesnesine ekle
    next();
  });
};
