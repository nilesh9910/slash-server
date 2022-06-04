const User = require("../../models/User");
const { encrypt } = require("../../services/crypto");

const handleNewUser = async (req, res) => {
  const { email, password } = req.body;

  if (!(email || password)) {
    return res
      .status(400)
      .json({ message: "Username and password are mandatory" });
  }

  const duplicate = await User.findOne({ email }).exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: "User already exist, Please Sign in." });
  }

  try {
    const hashedPassword = await encrypt(password);

    await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: `New user ${email} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
