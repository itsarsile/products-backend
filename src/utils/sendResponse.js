// const response = (res, result, status, message, pagination) => {
//   const resultPrint = {};
//   resultPrint.status = 'success';
//   resultPrint.statusCode = status;
//   resultPrint.data = result;
//   resultPrint.message = message || null;
//   resultPrint.pagination = pagination || {};
//   res.status(status).json(resultPrint);
// };

const sendResponse = (res, { data, message, pagination }, success = true, status = 200) => {
  const response = {
    success,
    message: message || null,
    pagination: pagination || {},
  };

  if (data !== undefined) {
    response.data = data;
  }

  res.status(status).json(response);
};

module.exports = sendResponse;

// module.exports = { response };
