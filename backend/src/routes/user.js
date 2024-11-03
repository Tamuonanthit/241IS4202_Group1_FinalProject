const router = require('express').Router();
const {
  getUser, updateUser, deleteUser, avatarUpdate, getUsersList, getUserById, deleteUserById, adminUpdateUser
} = require('../controller/users');
const { isAuthenticatedUser } = require('../middleware/verify_token')
const {verifyAdmin}=require('../middleware/verify_admin')
const avatarUpload = require('../middleware/user_avatar_upload')
// get user info route
router.route('/get-user').get(isAuthenticatedUser, getUser);
router.route('/get-user/:id').get(isAuthenticatedUser, verifyAdmin, getUserById);

// update user info route
router.route('/update-user').put(isAuthenticatedUser, updateUser);
// admin update user info
router.route('/admin-update-user/:id').put(isAuthenticatedUser,verifyAdmin, adminUpdateUser);


// user profile image/avatar update
router.route('/avatar-update').put(isAuthenticatedUser, avatarUpload.single('avatar'), avatarUpdate);

// delete user route
router.route('/delete-user').delete(isAuthenticatedUser, deleteUser);
router.route('/delete-user/:id').delete(isAuthenticatedUser, verifyAdmin, deleteUserById);

// get all users list for admin
router.route('/all-users-list').get(isAuthenticatedUser,  verifyAdmin, getUsersList);


module.exports = router;