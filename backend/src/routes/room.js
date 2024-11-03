const express = require('express');
const router = express.Router();
const {createRoom, getAllRooms, getRoomById, updateRoom, deleteRoom}= require('../controller/rooms');
const { isAuthenticatedUser } = require('../middleware/verify_token');
const { verifyAdmin } = require('../middleware/verify_admin');
const {isRoomAvailable} = require('../middleware/isRoomAvailable')
const roomsImageUpload = require('../middleware/room_image_upload')
// POST: Create a new room (Admin only)
router.route('/create-room').post(isAuthenticatedUser, verifyAdmin, roomsImageUpload.array('room_img', 5), createRoom);

// GET: Get all rooms
router.route('/get-room').get(getAllRooms);

// GET: Get a single room by ID (Admin only)
router.route('/get-room/:roid').get(isAuthenticatedUser, verifyAdmin, getRoomById);

// PATCH: Update a room by ID (Admin only)
router.route('/update-room/:roid').patch(isAuthenticatedUser,verifyAdmin,
    roomsImageUpload.array('room_images', 5), 
    updateRoom);

// DELETE: Delete a room by ID (Admin only)
router.route('/delete-room/:roid').delete(isAuthenticatedUser, verifyAdmin, deleteRoom);

module.exports = router;

