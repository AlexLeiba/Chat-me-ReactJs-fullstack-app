import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.chat_me_token;
    if (!token) {
      return res.status(401).json({ message: 'No Token Provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // decoded is user value based on token data

    if (!decoded) {
      throw new Error('Invalid Token');
    }

    const userFromDB = await UserModel.findById(decoded.id).select(
      '-password' //to send everything except password to the client
    );

    if (!userFromDB) {
      throw new Error('User not found');
    }

    // attach user object to req
    req.user = userFromDB;

    next(); // pass to next fn in middleware
  } catch (error) {
    console.log('🚀 \n\n ~ protectRoute ~ error:', error);

    res
      .status(500)
      .json({ message: 'Internal server error on checking token' });
  }
};

// import jwt from 'jsonwebtoken';
// import User from '../models/user.model.js';

// export const protectRoute = async (req, res, next) => {
//   try {
//     const token = req.cookies.chat_me_token;

//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: 'Unauthorized - No Token Provided' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (!decoded) {
//       return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
//     }

//     const user = await User.findById(decoded.userId).select('-password');

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     req.user = user;

//     next();
//   } catch (error) {
//     console.log('Error in protectRoute middleware: ', error.message);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
