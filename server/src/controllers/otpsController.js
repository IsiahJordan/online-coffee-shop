const { getOTP, createOTP, invalidateOTP, updateAttempts } = require("../models/Otps.js");
const jwt = require("jsonwebtoken");

// Generate client OTP
async function initOTP(req, res){
  const { email } = req.body;

  // invalidate old Otps
  await invalidateOTP(email); 
  
  // Initialize OTP
  const digits = 4; // number of digit codes for OTP
  await createOTP(email, digits);
  
  res.status(201).json({ success: true });
}

async function verifyOTP(req, res){
  const { email, code } = req.body;

  const otp_code =  await getOTP(email);

  // Action is what would the fontend do 
  if (!otp_code) return res.status(400).json({ success: false, action: "return", error: "Failed to get otp code" });
  console.log(`User Code: ${code} and OTP Code: ${otp_code.otp}`);

  if (otp_code.otp !== code) {
    const attempts = updateAttempts(email);

    if (attempts === 5){
      // remove otp from usuable
      await invalidateOTP(email);
      console.log("Authentication Failed");
      return res.status(400).json({ success: false, action: "return", error: "OTP Authentication Failed!!" });
    }
    else {
      console.log("OTP do not match");
      return res.status(400).json({ success: false, action: "retry", error: "OTP Do Not Match" })
    }
  }

  console.log("User OTP and Server OTP matched.");
  res.status(201).json({ success: true, msg: "successful authentication"});
}

async function successOTP(req, res){
  const { email } = req.body;
  
  // Change to true in used
  await invalidateOTP(email);

  res.status(201).json({ succss: true, msg: "change used to true" });
}

module.exports = { initOTP, verifyOTP, successOTP };
