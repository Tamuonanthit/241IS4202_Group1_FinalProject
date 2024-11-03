const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    check_in_date: {
      type: Date,
      required: true,
    },
    check_out_date: {
      type: Date,
      required: true,
    },
    contact_infor: {
      full_name: { type: String, required: true },
      gender: {type: String, require: true},
      phone_number: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },

    },
    guest: [
      {
        name: { type: String, required: true }
      },
    ],
    checkin_time: {
      type: String,
      required: false,
    },
    special_request: {
      type: String,
      required: false,
    },
    booking_status: {
      type: String,
      required: true,
      default: 'pending',
      enum: ['done', 'pending', 'cancel'],
    },
    total_amount: {
      type: Number,
      required: true,
    },
    room_id: [{
      type: String,
      ref: 'rooms',
      require: true
    }],
    user_id: {
      type: String,
      ref: 'users',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('bookings', BookingSchema);