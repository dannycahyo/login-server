const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "danny secret", {
    expiresIn: maxAge,
  });
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (user) {
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      const token = createToken(user._id);
      return token;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

const signup = async (email, password) => {
  const salt = await bcrypt.genSalt();
  const encriptedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ email, password: encriptedPassword });
  const token = createToken(user._id);
  return token;
};

module.exports = { login, signup };
