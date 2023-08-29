const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const validateBodyFavorite = require("./validateBodyFavorite");
const authenticate = require("./authenticate");
const validateSubscription = require("./validSubscriptions");
const upload = require("./upload");

module.exports = {
  validateBody,
  isValidId,
  validateBodyFavorite,
  authenticate,
  validateSubscription,
  upload,
};
