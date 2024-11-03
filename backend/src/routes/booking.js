const express = require('express');
const router = express.Router();
const { createBooking, getAdminBookings, getUserBookings, cancelSelfBookingOrder} = require ('../controller/bookings')
const { isAuthenticatedUser } = require('../middleware/verify_token');
const { verifyAdmin } = require('../middleware/verify_admin');
const {isRoomAvailable, searchRoomAvailable} =require('../middleware/isRoomAvailable');

//Test isRoomAvailable

router.route('/create-booking').post(isAuthenticatedUser,isRoomAvailable, createBooking); 

router.route('/usergetbooking').get(isAuthenticatedUser, getUserBookings)

router.route('/admingetbooking').get(isAuthenticatedUser,verifyAdmin, getAdminBookings)

router.route('/search-room').post(searchRoomAvailable)

router.route('/cancel-booking/:id').patch(isAuthenticatedUser, cancelSelfBookingOrder);


module.exports = router;
