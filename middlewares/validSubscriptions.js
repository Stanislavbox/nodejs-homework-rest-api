const { HttpError } = require("../helpers");

const validSubscriptions = ["starter", "pro", "business"];

const validateSubscription = (req, res, next) => {
  const { subscription } = req.body;

  if (!validSubscriptions.includes(subscription)) {
    next(HttpError(400, "Invalid subscription value"));
  }

  next();
};

module.exports = validateSubscription;
