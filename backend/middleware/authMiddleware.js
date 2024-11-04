// IMPORT NECESSARY LIBRARIES
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Authentication failed." });
  }
};

// Export as default
export default isAuth;

// BY CHATGPT

// // IMPORT NECESSARY LIBRARIES
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// const isAuth = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "Authorization header missing or malformed." });
//     }

//     const token = authHeader.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized access." });
//     }

//     // Verify the token
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decodedToken.id);

//     if (!user) {
//       return res.status(403).json({ message: "User not found. Access forbidden." });
//     }

//     // Attach user to request object for use in next middleware or route handler
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Authentication error:", error);
//     if (error.name === "JsonWebTokenError") {
//       return res.status(403).json({ message: "Invalid token. Access forbidden." });
//     } else if (error.name === "TokenExpiredError") {
//       return res.status(403).json({ message: "Token expired. Please log in again." });
//     }
//     res.status(500).json({ message: "Internal Server Error in authentication." });
//   }
// };

// // Export as default
// export default isAuth;
