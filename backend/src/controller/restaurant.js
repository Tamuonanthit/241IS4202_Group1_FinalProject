  // CURD by Admin 
  // Get all
  // Get by ID

  const Restaurant = require('../models/restaurants');
  const { createSuccess, createError } = require('../config/response');
  const { APP_BASE_URL } = require('../config/envfile');
  const multer = require('multer');
  const path = require('path');
  const fs = require('fs');
  const appRoot = require('app-root-path')
  
    // Create a new restaurant
    exports.createRestaurant = async (req, res, next) => {
      const { restaurant_name, restaurant_detail, restaurant_menu, restaurant_signature, create_by } = req.body;
  
      const newRestaurant = new Restaurant({
        restaurant_name,                
        restaurant_detail,               
        restaurant_menu,                 
        restaurant_signature,
      });
  
      try {
        const savedRestaurant = await newRestaurant.save();
        res.status(201).json(createSuccess(201, 'Restaurant created successfully', savedRestaurant));
      } catch (err) {
        console.log(err)
        res.status(500).json(createError(500, 'Creating restaurant failed, please try again.'));
      }
    };
  
    // Get all restaurants (Admin access required)
    exports.getAllRestaurants = async (req, res, next) => {
      try {
          const restaurants = await Restaurant.find();
          if (!restaurants.length) {
              return res.status(404).json(createError(404, 'No restaurants found'));
          }
  
          const restaurantsWithFullImageUrls = restaurants.map(restaurant => ({
              restaurant_detail: restaurant.restaurant_detail,
              _id: restaurant._id,
              restaurant_name: restaurant.restaurant_name,
              restaurant_menu: restaurant.restaurant_menu,
              restaurant_signature: restaurant.restaurant_signature.map(signature => ({
                  images: `${APP_BASE_URL}/${signature.images}`,
                  describe: signature.describe,
                  _id: signature._id
              })),
              createdAt: restaurant.createdAt,
              updatedAt: restaurant.updatedAt,
              __v: restaurant.__v
          }));
  
          res.status(200).json(createSuccess(200, 'Restaurants retrieved successfully', restaurantsWithFullImageUrls));
      } catch (err) {
          res.status(500).json(createError(500, 'Fetching restaurants failed, please try again later.'));
      }
  };
  
  
  
  
  
    // Get restaurant by ID (Admin access required)
    exports.getRestaurantById = async (req, res, next) => {
      const restaurantId = req.params.rid;
  
      try {
        const restaurant = await Restaurant.findById(restaurantId);  // Truy vấn theo ObjectId
        if (!restaurant) {
          return res.status(404).json(createError(404, 'Restaurant not found'));
        }
  
        res.status(200).json(createSuccess(200, 'Restaurant retrieved successfully', restaurant));
      } catch (err) {
        res.status(500).json(createError(500, 'Fetching restaurant failed, please try again later.'));
      }
    };
  
  
    // Update restaurant by ID (Admin access required)
    exports.updateRestaurant = async (req, res, next) => {
      const restaurantId = req.params.rid;
      const { restaurant_name, restaurant_detail, restaurant_menu, restaurant_signature } = req.body;
  
      try {
        const restaurant = await Restaurant.findById(restaurantId); // Tìm nhà hàng theo ObjectId
        if (!restaurant) {
          return res.status(404).json(createError(404, 'Restaurant not found'));
        }
  
        // Cập nhật các trường
        restaurant.restaurant_name = restaurant_name;
        restaurant.restaurant_detail = restaurant_detail;
        restaurant.restaurant_menu = restaurant_menu;
        restaurant.restaurant_signature = restaurant_signature;
        restaurant.updatedAt = Date.now(); // Tự động với timestamps: true
  
        const updatedRestaurant = await restaurant.save();  // Lưu nhà hàng đã cập nhật
        res.status(200).json(createSuccess(200, 'Restaurant updated successfully', updatedRestaurant));
      } catch (err) {
        res.status(500).json(createError(500, 'Updating restaurant failed, please try again later.'));
      }
    };
  
  
    // Delete restaurant by ID (Admin access required)
    exports.deleteRestaurant = async (req, res, next) => {
      const restaurantId = req.params.rid;
  
      try {
        const restaurant = await Restaurant.findByIdAndDelete(restaurantId);  // Xóa nhà hàng theo ID
        if (!restaurant) {
          return res.status(404).json(createError(404, 'Restaurant not found'));
        }
  
        res.status(200).json(createSuccess(200, 'Restaurant deleted successfully'));
      } catch (err) {
        res.status(500).json(createError(500, 'Deleting restaurant failed, please try again later.'));
      }
    };
  
    //Signature image upload by ID (Only Admin)
    exports.updateRestaurantSignature = async (req, res) => {
      try {
          const restaurantId = req.params.rid;
          const files = req.files;
          const descriptions = req.body.describe;
  
          // Find the restaurant by ID
          const restaurant = await Restaurant.findById(restaurantId);
          if (!restaurant) {
              return res.status(404).json({
                  status: 'error',
                  message: 'Restaurant does not exist',
              });
          }
  
          // Check if files were uploaded
          if (!files || files.length === 0) {
              return res.status(400).json({
                  status: 'error',
                  message: 'Restaurant signature images are required',
              });
          }
  
          // Ensure descriptions is an array (if only one description, wrap it in an array)
          const descriptionsArray = Array.isArray(descriptions) ? descriptions : [descriptions];
  
          // Map the uploaded files and descriptions to signature objects
          const newSignatures = files.map((file, index) => ({
              images: `uploads/restaurants/${file.filename}`,
              describe: descriptionsArray[index] || '',
          }));
  
          // Append the new signatures to the existing restaurant_signature array
          restaurant.restaurant_signature.push(...newSignatures);
  
          // Save the updated restaurant document
          await restaurant.save();
  
          res.status(200).json({
              message: 'Restaurant signature added successfully',
              data: restaurant.restaurant_signature,
          });
      } catch (error) {
          // Cleanup uploaded files if there's an error
          if (req.files) {
              req.files.forEach(file => {
                  const filePath = path.join('uploads', 'restaurants', file.filename);
                  if (fs.existsSync(filePath)) {
                      fs.unlink(filePath, (err) => {
                          if (err) console.error(err);
                      });
                  }
              });
          }
  
          res.status(500).json({
              status: 'error',
              message: 'SERVER SIDE ERROR',
              error: error.message,
          });
      }
  };
  