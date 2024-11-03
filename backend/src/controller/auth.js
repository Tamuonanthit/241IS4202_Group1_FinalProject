const fs = require('fs');
const crypto = require('crypto');
const appRoot = require('app-root-path');
const User = require('../models/user');
const EmailPromotion = require('../models/email_promotion')
const sendEmail = require('../config/send_email');
const { JWT_TOKEN_COOKIE_EXPIRES, APP_SERVICE_URL } = require('../config/envfile');
const { loginResponse } = require('../config/loginResponse');
const validateEmail =require('../middleware/validate_email')
const sendEmailPromotion=require('../config/send_email_promotion')


// TODO: Controller for registering a new user
const path = require('path'); // Thêm thư viện path nếu chưa csó

// Trong hàm register
exports.register = async (req, res) => {
  try {
    const { username, fullname, email, password } = req.body;

    if (username && fullname && email && password) {
      const findUserName = await User.findOne({ username });
      const findEmail = await User.findOne({ email });

      if (findUserName || findEmail) {
        if (req?.file?.filename) {
          fs.unlink(path.join(appRoot.path, `/public/uploads/users/${req.file.filename}`), err => {
            if (err) console.log(err);
          });
        }
        return res.status(409).json({ message: findUserName ? 'Username already exists' : 'Email already exists' });
      }

      // Tạo user và lưu đường dẫn avatar tùy chỉnh
      const avatarPath = `/uploads/users/avatar.jpg`;
      const user = await User.create({
        username,
        fullname,
        email,
        password,
        avatar: avatarPath // Lưu đường dẫn avatar với format mong muốn
      });

      // Gửi email xác thực
      await exports.sendEmailVerificationLink(req, res, user);

      return res.status(201).json({ message: 'User registered successfully' });
    } else {
      if (req?.file?.filename) {
        fs.unlink(path.join(appRoot.path,`/public/uploads/users/${req.file.filename}`), err => {
          if (err) console.log(err);
        });
      }
      return res.status(400).json({ message: 'Please enter all required fields' });
    }
  } catch (error) {
    if (req?.file?.filename) {
      fs.unlink(path.join(appRoot.path, `/public/uploads/users/${req.file.filename}`), err => {
        if (err) console.log(err);
      });
    }
    console.error(error);
    return res.status(500).json({ message: 'SERVER SIDE ERROR' });
  }
};


// TODO: Controller for login existing user
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Please enter username and password' });
    }

    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'User password is incorrect' });
    }

    const logUser = await User.findByIdAndUpdate(user._id, { status: 'login', updatedAt: Date.now() }, { new: true });
    loginResponse(res, logUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// TODO: Controller for logging out user
exports.logoutUser = async (req, res) => {
  try {
    const { user } = req;

    if (!user) {
      return res.status(404).json({ message: 'Unauthorized access. Please login to continue' });
    }

    res.clearCookie('AccessToken');
    await User.findByIdAndUpdate(user._id, { status: 'logout', updatedAt: Date.now() }, { new: true });
    
    return res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'SERVER SIDE ERROR' });
  }
};

// TODO: Controller for user forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const url = `${APP_SERVICE_URL}/auth/forgot-password/${resetToken}`;
    const subjects = 'Password Recovery Email';
    const message = 'Click below link to reset your password. If you have not requested this email, simply ignore this email.';
    const title = 'Recover Your Password';

    sendEmail(res, user, url, subjects, message, title);
  } catch (error) {
    res.status(500).json({ message: 'SERVER SIDE ERROR' });
  }
};

// TODO: Controller for user reset password
exports.resetPassword = async (req, res) => {
  try {
    if (req.params.token && req.body.password && req.body.confirmPassword) {
      const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(404).json({ message: 'Reset Password Token is invalid or has expired' });
      }

      if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({ message: 'Password and Confirm password do not match' });
      }

      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      return res.status(200).json({ message: 'User password reset successfully' });
    } else {
      return res.status(400).json({ message: 'Please enter all required fields' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'SERVER SIDE ERROR' });
  }
};

// TODO: Controller for user change password
exports.changePassword = async (req, res) => {
  try {
    if (req.body.oldPassword && req.body.newPassword) {
      const { user } = req;

      if (!user) {
        return res.status(404).json({ message: 'User does not exist' });
      }

      const user2 = await User.findOne({ email: user.email }).select('+password');

      const isPasswordMatch = await user2.comparePassword(req.body.oldPassword);
      if (!isPasswordMatch) {
        return res.status(400).json({ message: 'User credentials are incorrect' });
      }

      user.password = req.body.newPassword;
      await user.save();

      return res.status(200).json({ message: 'User password changed successfully' });
    } else {
      return res.status(400).json({ message: 'Please enter all required fields' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'SERVER SIDE ERROR' });
  }
};

// TODO: Controller for user email verification link send
exports.sendEmailVerificationLink = async (req, res, user) => {
  try {
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    if (user.verified === 'active') {
      return res.status(400).json({ message: 'Your email is already verified' });
    }

    const verificationToken = user.getEmailVerificationToken();
    await user.save({ validateBeforeSave: false });

    const url = `${APP_SERVICE_URL}/auth/verify-email/${verificationToken}`;
    console.log(url)
    const subjects = 'User Email Verification';
    const message = 'Click below link to verify your email. If you did not request this email, please ignore it.';
    const title = 'Verify Your Email';

    sendEmail(res, user, url, subjects, message, title);
  } catch (error) {
    return res.status(500).json({ message: 'SERVER SIDE ERROR' });
  }
};

// TODO: Controller for user email verification
exports.emailVerification = async (req, res) => {
  try {
    if (req.params.token) {
      const emailVerificationToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

      const user = await User.findOne({
        emailVerificationToken,
        emailVerificationExpire: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(404).json({ message: 'Email verification token is invalid or has expired' });
      }

      user.emailVerificationToken = undefined;
      user.emailVerificationExpire = undefined;
      user.verified = 'active';
      await user.save();

      return res.status(200).json({ message: 'Email verified successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid token' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'SERVER SIDE ERROR' });
  }
};


// TODO: Controller for user refresh-token
exports.refreshToken = async (req, res) => {
  try {
    const { user } = req;

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const accessToken = user.getJWTToken();
    const refreshToken = user.getJWTRefreshToken();

    const options = {
      expires: new Date(Date.now() + JWT_TOKEN_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie('AccessToken', accessToken, options);
    return res.status(200).json({ message: 'JWT refresh token generated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'SERVER SIDE ERROR' });
  }
};


exports.sendPromotion = async (req, res) => {
  try {
    const email = req.body.email;
    console.log('Email received:', email);
    console.log('Is email valid:', validateEmail(email));

    // Validate the email
    if (!email || !validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid or missing email address' });
    }

    // Check if the email already exists in the promotion collection
    const existingEmail = await EmailPromotion.findOne({ email });
    if (!existingEmail) {
      const newEmailPromotion = new EmailPromotion({ email });
      await newEmailPromotion.save();
    }

    // Prepare email details
    const url = `${APP_SERVICE_URL}/promotion`;
    const subject = 'Special Promotion!';
    const message = 'Thank you for your interest. Check out this special promotion!';
    const title = 'Exclusive Promotion Just For You';

    // Send the promotion email
    const emailSentResponse = await sendEmailPromotion(res, email, url, subject, message, title);
    
    // If sendEmailPromotion resolves, it will already have sent a response.
    // So, we need to avoid sending another response here.
    if (!emailSentResponse) {
      // If the email sending function does not send a response, send a success message.
      res.status(200).json({ message: 'Promotion email sent successfully!' });
    }
  } catch (error) {
    console.error('Error:', error);
    if (!res.headersSent) { // Check if the response has already been sent.
      return res.status(500).json({ message: 'SERVER SIDE ERROR' });
    }
  }
};


