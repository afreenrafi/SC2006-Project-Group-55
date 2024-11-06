// IMPORT NESCESSARY LIBRARIES
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id; //Extracting only the userId

    const userExists = await User.exists({_id: userid}); 
    if(!userExists){
      return res.status(401).json({message: "User is not found."}); 
    }

    req.userId = userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Authentication failed." });
  }
};

// Export as default
export default isAuth;
