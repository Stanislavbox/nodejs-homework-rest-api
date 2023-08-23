const { User, schemas } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
  
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const { error } = schemas.registerSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const newUser = await User.create(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
