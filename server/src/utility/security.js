const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function generate_otp(length){
  let otp = "";
  
  for (let i = 0; i < length; i++){
    otp += digits[crypto.randomInt(10)];
  }
  
  return otp;
}

function verifyToken(token){
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    return decoded;
  } catch(err) {
    throw new Error("Invalid or expired token");
  }
}

module.exports = { generate_otp, verifyToken };
