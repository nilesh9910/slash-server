const otpGenerator = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports.generateOTP = () => {
  const OTP = otpGenerator(100000, 999999);
  return OTP;
};
