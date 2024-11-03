const mongoose = require('mongoose');

const emailPromotionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports =  mongoose.model('EmailPromotion', emailPromotionSchema);
