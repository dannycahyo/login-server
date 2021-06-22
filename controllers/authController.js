const { login, signup } = require("../service/authService");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  //  incorrect email
  if (err.message === "Incorrect email") {
    errors.email = "That email is not registered";
  }

  //  incorrect password
  if (err.message === "Incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate error code
  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await signup(email, password);
    res.json({ token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await login(email, password);
    res.json({ token });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
