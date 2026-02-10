const morgan = require("morgan");
const logger = require("../logger");

// Ghi log HTTP request bằng morgan + winston
const stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

module.exports = morgan("combined", { stream });


