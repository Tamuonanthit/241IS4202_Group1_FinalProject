const router = require('express').Router();
const avatarUpload = require('../middleware/user_avatar_upload');
const { isAuthenticatedUser, isRefreshTokenValid} = require('../middleware/verify_token');
const {
  register, loginUser, logoutUser, forgotPassword, resetPassword, changePassword, sendPromotion , emailVerification, refreshToken
} = require('../controller/auth');


// routes for register, login and logout user
router.route('/auth/register').post(avatarUpload.single('avatar'), register);
router.route('/auth/login').post(avatarUpload.none(),loginUser);
router.route('/auth/logout').post(isAuthenticatedUser, logoutUser);

// routes for forgot & change password
router.route('/auth/forgot-password').post(forgotPassword);
router.route('/auth/reset-password/:token').post(resetPassword);


router.route('/auth/change-password').post(isAuthenticatedUser, changePassword);

// routes for user email verification
router.route('/auth/verify-email/:token').post(isAuthenticatedUser, emailVerification);
router.route('/auth/send-email-promotion').post(sendPromotion);

// route for get user refresh JWT Token
router.route('/auth/refresh-token').get(isRefreshTokenValid, refreshToken);

module.exports = router;