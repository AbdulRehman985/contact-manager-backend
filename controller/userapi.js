const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt"); // or "bcrypt"
const User = require("../models/userModel.js"); // adjust path if needed
const jwt = require("jsonwebtoken");
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const userAvailable = await User.findOne({ email });

  if (userAvailable) {
    res.status(409); // Conflict
    throw new Error("User already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password:", hashedPassword);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    res.status(201).json({
      message: `User created successfully`,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user._id,
          },
        },
        process.env.SECRET,
        { expiresIn: "15m" }
      );
      res.status(201).send(accessToken);
    } else {
      res.status(401);
      throw new Error("emial or password is not valid");
    }
  } catch (error) {
    res.send(error.message);
  }
});
const current = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  register,
  login,
  current,
};
