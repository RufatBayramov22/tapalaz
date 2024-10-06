import jwt from "jsonwebtoken";

// Authorization Middleware
export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // Get the token from cookies
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify the token
    req.userId = decoded.id; // Set the user ID in the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Token validation error:", err); // Log the error message
    return res.status(401).json({ message: 'Token is not valid' });
  }
};
