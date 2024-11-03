const currentDateTime = require('../func/current');
const getDateAfterDuration = require('../func/getdate');
const { APP_BASE_URL, JWT_TOKEN_COOKIE_EXPIRES, JWT_ACCESS_TOKEN_EXPIRES, JWT_REFRESH_TOKEN_EXPIRES } = require('../config/envfile');

const loginResponse = (res, user) => {
  const accessToken = user.getJWTToken();
  const refreshToken = user.getJWTRefreshToken();

  // Options for the cookie
  const cookieOptions = {
    expires: new Date(Date.now() + JWT_TOKEN_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    httpOnly: true, // Prevent access from the client-side JS
  };

  res
    .status(200)
    .cookie('AccessToken', accessToken, cookieOptions)
    .json({
      result_code: 0,
      time: currentDateTime(),
      access_token: accessToken,
      refresh_token: refreshToken,
      access_token_expires: getDateAfterDuration(JWT_ACCESS_TOKEN_EXPIRES),
      refresh_token_expires: getDateAfterDuration(JWT_REFRESH_TOKEN_EXPIRES),
      result: {
        title: 'SUCCESS',
        message: 'User login successful',
        data: {
          id: user._id,
          username: user.username,
          fullname: user.fullname,
          email: user.email,
          phone_number: user.phone_number,
          avatar: APP_BASE_URL  + user.avatar,
          gender: user.gender,
          status: user.status,
          dob: user.dob,
          address: user.address,
          verified: user.verified,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      }
    });
};

module.exports = { loginResponse };
