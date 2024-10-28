// IMPORT NESCESSARY LIBRARIES
import jwt from 'jsonwebtoken';  
import User from '../models/User.js';

const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized access.' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        req.user = user; 
        next(); 
    } catch (error) {
        console.error(error); 
        res.status(401).json({ message: 'Authentication failed.' });
    }
};

// Export as default
export default  isAuth; 
