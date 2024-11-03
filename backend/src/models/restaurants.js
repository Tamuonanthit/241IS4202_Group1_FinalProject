const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema(
  {
    restaurant_name: {
      required: true,
      type: String,
      trim: true,
    },
    restaurant_detail: {
      location: { type: String, required: true },
      guest: { type: Number, required: true },
      menu_detail: { type: String, required: true },
      hours: { type: String, required: true },
    },
    restaurant_menu: {
      type: [String],
      required: true,
    },
    restaurant_signature: [
      {
        images: { type: String, required: true },
        describe: { type: String, required: true },
      },
    ]
  },
  { timestamps: true } // timestamps: createdAt, updatedAt
);

module.exports = mongoose.model('restaurants', RestaurantSchema);
