import jwt from "jsonwebtoken";
// Authorization Middleware
export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Check for token in cookies or Authorization header

  console.log("Token received:", token); // Log the token to ensure it's received

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify the token
    console.log("Decoded Token:", decoded); // Log decoded token to check if it's correct
    req.userId = decoded.id; // Attach userId to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Token validation error:", err);
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

