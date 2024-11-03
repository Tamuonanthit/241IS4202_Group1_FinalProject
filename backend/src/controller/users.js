const fs = require('fs');
const appRoot = require('app-root-path');
const User = require('../models/user');
const { APP_BASE_URL } = require('../config/envfile');

// Controller for getting user info
exports.getUser = async (req, res) => {
  try {
    const { user } = req;

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User does not exist',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'User information retrieved successfully',
      data: {
        id: user._id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        phone_number: user.phone_number,
        avatar: APP_BASE_URL + user.avatar,
        status: user.status,
        gender: user.gender,
        dob: user.dob,
        address: user.address,
        verified: user.verified,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'SERVER SIDE ERROR',
    });
  }
};

// Controller for getting user info by ID (admin)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User does not exist',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'User information retrieved successfully',
      data: {
        id: user._id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        phone_number: user.phone_number,
        avatar: APP_BASE_URL + user.avatar,
        status: user.status,
        gender: user.gender,
        dob: user.dob,
        address: user.address,
        verified: user.verified,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'SERVER SIDE ERROR',
    });
  }
};

// Controller for updating user info
exports.updateUser = async (req, res) => {
  try {
    const { user } = req;
    const { fullname, phone_number, gender, dob, address } = req.body;

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User does not exist',
      });
    }

    if (!fullname || !phone_number || !gender || !dob || !address) {
      return res.status(400).json({
        status: 'error',
        message: 'All fields are required',
      });
    }

    // Update user info & save to database
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { fullname, phone_number, gender, dob, address },
      { runValidators: true, new: true }
    );

    res.status(200).json({
        status: 'success',
        message: 'User info updated successfully',
        data: {
          username: updatedUser.username,
          fullname: updatedUser.fullname,
          email: updatedUser.email,
          phone_number: updatedUser.phone_number,
          avatar: APP_BASE_URL + user.avatar,
          status: updatedUser.status,
          gender: updatedUser.gender,
          dob: updatedUser.dob,
          address: updatedUser.address,
          verified: updatedUser.verified,
          isAdmin: updatedUser.isAdmin,
          createdAt: updatedUser.createdAt,
          updatedAt: updatedUser.updatedAt
        },
      });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'SERVER SIDE ERROR',
    });
  }
};

//
exports.adminUpdateUser = async (req, res) => {
  try {
    // Lấy userId từ tham số URL
    const userId = req.params.id;
    const { fullname, phone_number, gender, dob, address } = req.body;

    // Tìm kiếm người dùng theo userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User does not exist',
      });
    }

    // Cập nhật thông tin người dùng & lưu vào cơ sở dữ liệu
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullname,
        phone_number,
        gender,
        dob,
        address
      },
      { runValidators: true, new: true }
    );

    // Kiểm tra xem thông tin có được cập nhật thành công không
    if (!updatedUser) {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to update user info',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'User info updated successfully by admin',
      data: {
        username: updatedUser.username,
        fullname: updatedUser.fullname,
        email: updatedUser.email,
        phone_number: updatedUser.phone_number,
        avatar: `${APP_BASE_URL}${updatedUser.avatar}`,
        status: updatedUser.status,
        gender: updatedUser.gender,
        dob: updatedUser.dob,
        address: updatedUser.address,
        verified: updatedUser.verified,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt
      },
    });
  } catch (error) {
    console.error("Error updating user by admin:", error);
    res.status(500).json({
      status: 'error',
      message: 'Server-side error occurred',
    });
  }
};


// Controller for updating user avatar/image
exports.avatarUpdate = async (req, res) => {
  try {
    const { user, file } = req;

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User does not exist',
      });
    }

    if (!file) {
      return res.status(400).json({
        status: 'error',
        message: 'User avatar field is required',
      });
    }
    

    // Update user info & save to database
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { avatar: `/uploads/users/${file.filename}` },
      { runValidators: true, new: true }
    );

    // Delete old avatar if exists
    if (user.avatar && user.avatar.includes('/uploads/users')) {
      fs.unlink(`${appRoot}/public${user.avatar}`, (err) => {
        if (err) console.error(err);
      });
    }

    res.status(200).json({ message: 'User avatar updated successfully', 
      data:{
      username: updatedUser.username,
      fullname: updatedUser.fullname,
      email: updatedUser.email,
      phone_number: updatedUser.phone_number,
      avatar: APP_BASE_URL + updatedUser.avatar,
      status: updatedUser.status,
      gender: updatedUser.gender,
      dob: updatedUser.dob,
      address: updatedUser.address,
      verified: updatedUser.verified,
      isAdmin: updatedUser.isAdmin,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    }});
  } catch (error) {
    console.log(error)
    if (req.file && req.file.filename) {
      fs.unlink(`${appRoot}/public/uploads/users/${req.file.filename}`, (err) => {
        if (err) console.error(err);
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'SERVER SIDE ERROR',
    });
  }
};

// Controller for deleting user
exports.deleteUser = async (req, res) => {
  try {
    const { user } = req;

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User does not exist',
      });
    }

    // Delete user from database
    await User.findByIdAndDelete(user.id);

    // Delete user avatar if available
    if (user.avatar && user.avatar.includes('/uploads/users')) {
      fs.unlink(`${appRoot}/public${user.avatar}`, (err) => {
        if (err) console.error(err);
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'SERVER SIDE ERROR',
    });
  }
};

// Controller for deleting user by ID (admin)
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User does not exist',
      });
    }

    if (req.user.id.toString() === req.params.id) {
      return res.status(400).json({
        status: 'error',
        message: 'You cannot delete yourself',
      });
    }

    // Delete user from database
    await User.findByIdAndDelete(user.id);

    // Delete user avatar if available
    if (user.avatar && user.avatar.includes('/uploads/users')) {
      fs.unlink(`${appRoot}/public${user.avatar}`, (err) => {
        if (err) console.error(err);
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'SERVER SIDE ERROR',
    });
  }
};

// Controller for getting users list (admin)
exports.getUsersList = async (req, res) => {
  try {
    const users = await User.find();

    if (!users.length) {
      return res.status(404).json({
        status: 'error',
        message: 'No users found',
      });
    }
    res.status(200).json(
      {
        status: "success",
        data:
        {
          users
        }
      }
    )
    
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'SERVER SIDE ERROR',
    });
  }
};
