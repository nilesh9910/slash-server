require("dotenv").config();
module.exports = {
  allowedOrigins: ["http://localhost:3500/", "http://localhost:3000"],
  SERVER_PORT: process.env.PORT || 3500,
  SERVER_DB_URI: process.env.MONGO_URI,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  MAIL_SETTINGS: {
    service: "gmail",
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  },
};
