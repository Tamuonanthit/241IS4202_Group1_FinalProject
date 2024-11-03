const Room = require('../models/rooms');
const { createSuccess, createError } = require('../config/response');
const path = require('path');
const fs = require('fs');
const appRoot = require('app-root-path')
const { APP_BASE_URL } = require('../config/envfile');


// Create a new room
exports.createRoom = async (req, res, next) => {
  const { room_name, room_price, room_type, room_status, room_amenities, room_number } = req.body;

  // Parse `room_details` if it's a string
  let roomDetails = req.body.room_details;
  if (typeof roomDetails === 'string') {
      roomDetails = JSON.parse(roomDetails);
  }

  // Check if at least one image is uploaded
  if (!req.files || req.files.length === 0) {
    return res.status(400).json(createError(400, 'Minimum 1 `room_images` field is required.'));
  }

  const newRoom = new Room({
    room_number,
    room_name,
    room_price,
    room_type,
    room_status,
    room_details: roomDetails,
    room_amenities,
    room_img: req.files.map((file) => `uploads/rooms/${file.filename}`)

  });

  try {
    const savedRoom = await newRoom.save();
    res.status(201).json(createSuccess(201, 'Room created successfully', savedRoom));
  } catch (err) {
    // Delete uploaded images if room creation fails
    if (req.files) {
      req.files.forEach((file) => {
        fs.unlink(`${appRoot}/public/uploads/rooms/${file.filename}`, (unlinkErr) => {
          if (unlinkErr) console.error(unlinkErr);
        });
      });
    }
    console.error(err);
    res.status(500).json(createError(500, 'Creating room failed, please try again.'));
  }
};


// Get all rooms (Admin access required)
exports.getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();

    if (!rooms.length) {
      return res.status(404).json(createError(404, 'No rooms found'));
    }

    const roomsWithFullImageUrls = rooms.map(room => ({
      ...room.toObject(), 
      room_img: room.room_img.map(img => `${APP_BASE_URL}/${img}`),
    }));

    res.status(200).json(createSuccess(200, 'Rooms retrieved successfully', roomsWithFullImageUrls));
  } catch (err) {
    res.status(500).json(createError(500, 'Fetching rooms failed, please try again later.'));
  }
};

// Get room by ID (Admin access required)
exports.getRoomById = async (req, res, next) => {
  const roomId = req.params.roid; // Ensure you use the correct parameter name

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json(createError(404, 'Room not found'));
    }

    // Mapping room details to the desired format
    const mappedRoom = {
      room_number: room.room_number,
      room_name: room.room_name,
      room_price: room.room_price,
      room_type: room.room_type,
      room_status: room.room_status,
      room_details: room.room_details,
      room_amenities: room.room_amenities,
      room_img: room.room_img.map(img => `${APP_BASE_URL}/${img}`)
    };

    res.status(200).json(createSuccess(200, 'Room retrieved successfully', mappedRoom));
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json(createError(500, 'Fetching room failed, please try again later.'));
  }
};

// Update room by ID (Admin access required)
exports.updateRoom = async (req, res, next) => {
  const roomId = req.params.roid;
  const { 
    room_number, 
    room_name, 
    room_price, 
    room_type, 
    room_status, 
    room_details, 
    room_amenities, 
    room_img, // Hình ảnh mới
    images_to_remove // Mảng chứa các hình ảnh cần xóa
  } = req.body;

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json(createError(404, 'Room not found'));
    }

    // Cập nhật các thông tin của phòng
    room.room_number = room_number;
    room.room_name = room_name;
    room.room_price = room_price;
    room.room_type = room_type;
    room.room_status = room_status;
    room.room_details = room_details;
    room.room_amenities = room_amenities;

    // Cập nhật hình ảnh
    if (Array.isArray(images_to_remove)) {
      // Xóa các hình ảnh không cần thiết
      room.room_img = room.room_img.filter(img => !images_to_remove.includes(img));
    }

    // Thêm hình ảnh mới nếu có
    if (Array.isArray(room_img)) {
      room.room_img = [...new Set([...room.room_img, ...room_img])]; // Giữ lại hình ảnh cũ và thêm hình ảnh mới
    }

    const updatedRoom = await room.save();
    res.status(200).json(createSuccess(200, 'Room updated successfully', updatedRoom));
  } catch (err) {
    res.status(500).json(createError(500, 'Updating room failed, please try again later.'));
  }
};

// Delete room by ID (Admin access required)
exports.deleteRoom = async (req, res, next) => {
  const roomId = req.params.roid;

  try {
    const room = await Room.findByIdAndDelete(roomId);
    if (!room) {
      return res.status(404).json(createError(404, 'Room not found'));
    }

    res.status(200).json(createSuccess(200, 'Room deleted successfully'));
  } catch (err) {
    res.status(500).json(createError(500, 'Deleting room failed, please try again later.'));
  }
};
