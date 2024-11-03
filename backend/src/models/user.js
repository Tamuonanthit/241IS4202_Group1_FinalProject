const mongoose = require('mongoose'); 
const crypto = require('crypto');
const { JWT_REFRESH_TOKEN_SECRET_KEY, JWT_SECRET_KEY } = require('../config/envfile');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
    username: {
      required: [true, "Username is required"],
      type: String,
      unique: true,
      maxLength: [25, "Username cannot exceed 25 characters"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password field is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false
    },
    fullname: {
      required: [true, "Full name is required"],
      type: String,
      trim: true,
    },
    email: {
      required: [true, "Email is required"],
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
    },
    phone_number: {
      type: String, 
      trim: true,
      default: null
    },
    avatar: {
      type: String
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Unknown"],
      default: "Unknown",
    },
    dob: {
      type: Date,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["login", "logout"],
      default: null
    },
    verified: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
      default: null
    },
    resetPasswordExpire: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
      default: null
    },
    emailVerificationExpire: {
      type: Date,
      default:null
    }
  },
  { timestamps: true }  // This automatically adds createdAt and updatedAt
);

// Replace spaces with dashes in username before saving
UserSchema.pre('save', function (next) {
  if (this.username) {
    this.username = this.username.replace(/\s/g, '-');
  }

  next();
});
  
// Hash password before saving the document
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 8);
  next();
});

// Generate JWT Access Token
UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES
  });
};

// Generate JWT Refresh Token
UserSchema.methods.getJWTRefreshToken = function () {
  return jwt.sign({ id: this._id }, JWT_REFRESH_TOKEN_SECRET_KEY, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES
  });
};

// Compare passwords
UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Generate password reset token
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
  return resetToken;
};

// Generate email verification token
UserSchema.methods.getEmailVerificationToken = function () {
  const verificationToken = crypto.randomBytes(20).toString('hex');
  this.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');
  this.emailVerificationExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
  return verificationToken;
};



module.exports = mongoose.model('User', UserSchema);
