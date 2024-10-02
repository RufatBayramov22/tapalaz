import jwt from "jsonwebtoken";


export const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; 

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 
    req.userId = decoded.id; 
    next(); 
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

// import jwt from "jsonwebtoken";


// export const authMiddleware = (req,res,next)=>{
//   const token = req.cookies.token;

//   if(!token) return res.status(401).json({message:"Not Authenticated!"});
//   jwt.verify(token , process.env.JWT_SECRET_KEY, async (err , payload)=>{
//     if(err) return res.status(403).json({message:"Token is not valid"});
//   });
//   res.status(200).json({message:"You are Authenticated"})
// }