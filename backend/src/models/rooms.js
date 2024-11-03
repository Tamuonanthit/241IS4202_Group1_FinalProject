const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema(
  {
    room_number: {
      type: String,
      required: true,
      trim: true,
    },
    room_name: {
      type: String,
      required: true,
      trim: true,
    },
    room_price: {
      type: Number,
      required: true,
    },
    room_type: {
      type: String,
      required: true,
      trim: true,
    },
    room_status: {
      type: Boolean,
      default: true,
    },
    room_details: [
      {
        beds: {
          type: String,
          required: true,
        },
        occupancy: {
          type: String,
          required: true,
        },
        size: {
          type: String,
          required: false,
        },
        bathroom: {
          type: String,
          required: false,
        },
        view: {
          type: String,
          required: false,
        },
        unique_feature: {
          type: String,
          required: false,
        },
      },
    ],
    room_amenities: {
      type: [String],
      required: false,
      default: [],
    },
    room_img: {
      type: [String], 
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('rooms', RoomSchema);
