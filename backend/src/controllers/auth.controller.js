import bycrypt from 'bcryptjs';
import UserModel from '../models/user.model.js';
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';

export async function signup(req, res) {
  const { fullName, email, password, profilePicture } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all the fields' });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters long' });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new user
    const hashedPassword = bycrypt.hashSync(password, 10);

    const newUser = new UserModel({
      fullName,
      email,
      password: hashedPassword,
      profilePicture: profilePicture ? profilePicture : '',
    });

    if (newUser) {
      generateToken(newUser, res);

      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      });
    } else {
      return res.status(400).json({ message: 'Error creating user' });
    }
  } catch (error) {
    console.log('🚀 \n\n ~ signup ~ error:', error);

    return res.status(500).json({ message: 'Internal server error on signup' });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill in all the fields' });
    }
    const userFromDB = await UserModel.findOne({ email });

    if (!userFromDB) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }
    console.log('🚀 ~ login ~ userFromDB:', userFromDB);

    const isComparedPasswordsCorrect = bycrypt.compareSync(
      password,
      userFromDB.password
    );

    if (!isComparedPasswordsCorrect) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    generateToken(userFromDB, res);

    res.status(200).json({
      _id: userFromDB._id,
      fullName: userFromDB.fullName,
      email: userFromDB.email,
      profilePicture: userFromDB.profilePicture,
      createdAt: userFromDB.createdAt,
      updatedAt: userFromDB.updatedAt,
    });
  } catch (error) {
    console.log('🚀 \n\n ~ login ~ error:', error);
    return res.status(500).json({ message: 'Internal server error on login' });
  }
}
export async function logout({ req, res }) {
  try {
    res.cookie('chat-me-token', '', {
      maxAge: 0, //expire immediately,
    });

    res
      .status(200)
      .json({ message: 'Logged out successfully', user: req.user });
  } catch (error) {
    console.log('🚀 \n\n ~ logout ~ error:', error);
    res.status(500).json({ message: 'Internal server error on logout' });
  }
}

export async function updateProfile(req, res) {
  try {
    const { profilePicture } = req.body;
    const requestUserId = req.user._id; //the user object which was created on protectedRoute

    if (!profilePicture) {
      return res.status(400).json({ message: 'Profile picture is required' });
    }

    if (!requestUserId) {
      return res
        .status(400)
        .json({ message: 'Please login to update profile' });
    }

    const storedInCloudinaryImage = await cloudinary.uploader.upload(
      profilePicture,
      {
        folder: 'profile_pictures',
        use_filename: true,
        unique_filename: false,
      }
    );

    if (storedInCloudinaryImage.error) {
      return res
        .status(400)
        .json({ message: 'Error uploading profile picture' });
    }

    if (storedInCloudinaryImage.secure_url) {
      const updatedUser = await UserModel.findByIdAndUpdate(
        requestUserId,
        { profilePicture: storedInCloudinaryImage.secure_url },
        { new: true }
      );

      if (updatedUser) {
        return res.status(200).json({
          _id: updatedUser._id,
          fullName: updatedUser.fullName,
          email: updatedUser.email,
          profilePicture: updatedUser.profilePicture,
          createdAt: updatedUser.createdAt,
          updatedAt: updatedUser.updatedAt,
        });
      } else {
        return res.status(400).json({ message: 'Error updating profile' });
      }
    }
  } catch (error) {
    console.log('🚀 \n\n ~ updateProfile ~ error:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error on update profile' });
  }
}

// UPDATE FULL NAME
export async function updateProfileFullName(req, res) {
  try {
    const { fullName } = req.body;
    const requestUserId = req.user._id; //the user object which was created on protectedRoute

    if (!fullName) {
      return res.status(400).json({ message: 'Full name is required' });
    }

    if (!requestUserId) {
      return res
        .status(400)
        .json({ message: 'Please login to update profile' });
    }

    const updatedUserResponse = await UserModel.findByIdAndUpdate(
      requestUserId,
      { fullName },
      { new: true }
    );

    if (updatedUserResponse) {
      return res.status(200).json({
        _id: updatedUserResponse._id,
        fullName: updatedUserResponse.fullName,
        email: updatedUserResponse.email,
        profilePicture: updatedUserResponse.profilePicture,
        createdAt: updatedUserResponse.createdAt,
        updatedAt: updatedUserResponse.updatedAt,
      });
    } else {
      return res.status(400).json({ message: 'Error updating full name' });
    }
  } catch (error) {
    console.log('🚀 \n\n ~ updateProfile ~ error:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error on update full name' });
  }
}

export async function checkAuth(req, res) {
  try {
    // app.get('/api/auth/check', (req, res) => {
    //   res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    //   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    //   res.setHeader('Access-Control-Allow-Credentials', 'true');

    //   // Your logic here
    //   res.status(200).json({ message: 'Success' });
    // });
    res.status(200).json(req.user);
  } catch (error) {
    console.log('🚀 \n\n ~ checkAuth ~ error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
