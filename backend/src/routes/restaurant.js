const express = require('express');
const router = express.Router();
const { createRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant, updateRestaurantSignature} = require('../controller/restaurant');
const restaurantImageUpload =require('../middleware/restaurant_image_upload')
const { isAuthenticatedUser } = require('../middleware/verify_token');
const { verifyAdmin } = require('../middleware/verify_admin');

// POST: Tạo nhà hàng mới (chỉ dành cho Admin)
router.route('/create-res').post(isAuthenticatedUser, verifyAdmin, createRestaurant); 

// GET: Lấy tất cả danh sách nhà hàng (chỉ dành cho Admin)
router.route('/get-res').get( getAllRestaurants);

// GET: Lấy thông tin nhà hàng theo ID (chỉ dành cho Admin)
router.route('/get-res/:rid').get(isAuthenticatedUser, verifyAdmin, getRestaurantById);

// PATCH: Cập nhật thông tin nhà hàng theo ID (chỉ dành cho Admin)
router.route('/update-res/:rid').patch(isAuthenticatedUser, verifyAdmin, updateRestaurant);

// DELETE: Xóa nhà hàng theo ID (chỉ dành cho Admin)
router.route('/delete-res/:rid').delete(isAuthenticatedUser, verifyAdmin, deleteRestaurant);

//Put: Upload ảnh restaurant signature
router.route('/signature-images-upload/:rid').post(isAuthenticatedUser, verifyAdmin, restaurantImageUpload.array('images', 5), updateRestaurantSignature);

module.exports = router;
