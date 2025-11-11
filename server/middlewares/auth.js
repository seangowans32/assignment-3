// import jwt from 'jsonwebtoken';

// const authMiddleware = (req, res, next) => {
//     const token = req.headers.authorization? req.headers.authorization.split(" ")[1] : null;

//     if(!token) {
//         return res.status(401).json({message: "Unauthorized"});
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(401).json({message: "Invalid Token"});
//     }
// }

// export default authMiddleware;









import jwt from 'jsonwebtoken';

// Require a valid JWT and attach its payload to req.user
export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : null;

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded should be something like { id, role, iat, exp }
    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Allow only admins
export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  next();
};
