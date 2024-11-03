const Booking = require('../models/booking');
const Room = require('../models/rooms');
const mongoose = require('mongoose');
const { createError, createSuccess } = require('../config/response');
const convertDate =require('../func/convertDate')


const checkRoomAvailability = async (roomId, checkInDate, checkOutDate) => {
  const room = await Room.findById(roomId);
  if (!room || room.room_status === false) {
    return false;
  }

  const conflictBooking = await Booking.find({
    room_id: { $elemMatch: { $eq: roomId } },
    booking_status: { $ne: 'cancel' },
    $or: [
      { $and: [{ check_in_date: { $lte: checkInDate } }, { check_out_date: { $gte: checkOutDate } }] },
      { $and: [{ check_in_date: { $gte: checkInDate } }, { check_out_date: { $lte: checkOutDate } }] },
      { check_in_date: { $lte: checkOutDate } },
      { check_out_date: { $gte: checkInDate } }
    ]
  });

  return conflictBooking.length === 0;
};


exports.isRoomAvailable = async (req, res, next) => {
    try {
      const { room_ids, check_in_date, check_out_date } = req.body;
      const checkInDate = convertDate(check_in_date);
      const checkOutDate = convertDate(check_out_date);
  
      if (checkInDate >= checkOutDate) {
        return res.status(400).json(createError(400, 'Ngày check-in phải trước ngày check-out.'));
      }
  
      const unavailableRooms = [];
      const availableRooms = [];
  
      for (const roomId of room_ids) {
        const isAvailable = await checkRoomAvailability(roomId, checkInDate, checkOutDate);
  
        if (!isAvailable) {
          unavailableRooms.push(roomId);
        } else {
          availableRooms.push(roomId);
        }
      }
  
      if (unavailableRooms.length > 0) { 
        return res.status(400).json({
          available: false,
          unavailableRooms,
          message: 'Một số phòng không khả dụng trong khoảng thời gian này.'
        });
      }
      else {
        req.availableRooms = availableRooms; 
        next();
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json(createError(500, 'SERVER SIDE ERROR'));
    }
  };
  
  exports.searchRoomAvailable = async (req, res, next) => {
    try {
        const { check_in_date, check_out_date } = req.body;
        const checkInDate = convertDate(check_in_date);
        const checkOutDate = convertDate(check_out_date);
        
        if (checkInDate >= checkOutDate) {
            return res.status(400).json(createError(400, 'Ngày check-in phải trước ngày check-out.'));
        }

        const allRooms = await Room.find({ room_status: true });
        const availableRooms = [];

        for (const room of allRooms) {
            const isAvailable = await checkRoomAvailability(room._id, checkInDate, checkOutDate);
            if (isAvailable) {
                availableRooms.push(room);
            }
        }

        if (availableRooms.length === 0) {
            return res.status(400).json({
                available: false,
                message: 'No rooms available for the selected dates.'
            });
        } else {
            const mappedData = []; 

            for (const room of availableRooms) {
                const roomData = await Room.findById(room._id).select('-__v -createdAt -updatedAt');
                mappedData.push(roomData); 
            }

            return res.status(200).json({
                available: true,
                data: mappedData 
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(createError(500, 'SERVER SIDE ERROR'));
    }
};

  
  