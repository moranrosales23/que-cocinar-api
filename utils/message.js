const success = (data = {}, message = "") => ({
  code: 200,
  message,
  data,
});

const notFound = (message = "") => ({ code: 404, message, data: {} });

const error = (message = "") => ({
  code: 400,
  message,
  data: {},
});

module.exports = { success, notFound, error };
