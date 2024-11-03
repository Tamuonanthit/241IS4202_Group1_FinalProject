// Middleware to check if user is an admin
exports.verifyAdmin = async (req, res, next) => {
  try {
    // Retrieve the user from the request object
    const { user } = req;

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'Sorry, User does not exist' });
    }

    // Check if user has admin privileges
    if (user.isAdmin) {
      return next(); // Proceed if the user is an admin
    } else {
      return res.status(403).json({ message: 'Access denied. Only admin can access.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'SERVER SIDE ERROR' });
  }
};
