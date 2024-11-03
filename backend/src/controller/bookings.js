const Booking = require('../models/booking');
const Room = require('../models/rooms');
const User = require('../models/user')
const { createSuccess, createError } = require('../config/response');
const convertDate = require('../func/convertDate')
const mongoose = require('mongoose');

// Function to create a new booking
exports.createBooking = async (req, res) => {
  const { check_in_date, check_out_date, guest, total_amount, checkin_time, special_request, contact_infor } = req.body;
  
  try {
    const checkInDate = convertDate(check_in_date);
    const checkOutDate = convertDate(check_out_date);
    const roomIdsArray = req.availableRooms; 
    
    if (!roomIdsArray || roomIdsArray.length === 0) {
      return res.status(400).json(createError(400, 'No available rooms found for the selected dates.'));
    }
    const guestsArray = Array.isArray(guest) ? guest : [guest || []]; 

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json(createError(404, 'User not found'));
    }

    const bookingData = {
      check_in_date: checkInDate,
      check_out_date: checkOutDate,
      contact_infor: contact_infor,
      guest: guestsArray,
      checkin_time: checkin_time || null,
      special_request: special_request || '',
      booking_status: 'pending',
      total_amount: total_amount,
      room_id: roomIdsArray,
      user_id: user.id,
    };

    const newBooking = await Booking.create(bookingData);

    res.status(201).json(createSuccess(201, 'Booking created successfully.', newBooking));
  } catch (error) {
    console.log(error);
    res.status(500).json(createError(500, 'Server error', error));
  }
};

// Function to retrieve bookings for a user
exports.getUserBookings = async (req, res) => {
  const userId = req.user._id; // Get userId from authenticated user information

  try {
    const bookings = await Booking.find({ user_id: userId })
      .populate('room_id', 'room_name room_type room_price')
      .select('-__v -createdAt -updatedAt');

    // Check if bookings are empty
    if (bookings.length === 0) {
      return res.status(404).json(createError(404, 'No booking history found.'));
    }

    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json(createError(500, 'Error occurred while retrieving booking information.'));
  }
};

// Function to retrieve all bookings for admin
exports.getAdminBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('room_id', 'room_name room_type room_price')
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json(createError(500, 'Error occurred while retrieving booking information.'));
  }
};

// Function to cancel a user's own booking order
exports.cancelSelfBookingOrder = async (req, res) => {
  try {
    let booking = null;

    // Kiểm tra ID booking
    if (/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
      booking = await Booking.findOne({ _id: req.params.id, user_id: req.user.id });
    } else {
      return res.status(400).json(createError(400, 'Something went wrong. Probably booking ID is missing/incorrect'));
    }

    // Kiểm tra booking có tồn tại không và người dùng có quyền hủy không
    if (!booking) {
      return res.status(404).json(createError(404, 'Booking not found or you are not authorized to cancel this booking'));
    }

    // Kiểm tra trạng thái booking
    if (booking.booking_status !== 'pending' && booking.booking_status !== 'done') {
      return res.status(400).json(createError(400, 'This booking cannot be `canceled` as it is not in `pending` or `done` status'));
    }

    // Cập nhật trạng thái booking thành 'canceled'
    booking.booking_status = 'canceled';
    await booking.save({ validateBeforeSave: false });

    // Phản hồi thành công
    res.status(200).json(createSuccess('Booking order has been canceled successfully', booking));
  } catch (error) {
    console.log(error);
    res.status(500).json(createError(500, 'SERVER SIDE ERROR'));
  }
};
