const createSuccess = (statusCode, message, data) => {
  return {
    status: "success",
    statusCode,
    message,
    data,
  };
};

const createError = (statusCode, message) => {
  return {
    status: "error",
    statusCode,
    message,
  };
};

module.exports = { createSuccess, createError };