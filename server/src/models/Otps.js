const pool = require("../config/db.js");
const security = require("../utility/security.js");

// Generate OTP
async function createOTP(email, length){
  const otp_code = security.generate_otp(length);
  const expires_at = new Date(Date.now() + 30 * 60 * 1000);

  const result = await pool.query(
    `INSERT INTO otps (email, otp, expires_at) VALUES ($1, $2, $3)`
  , [email, otp_code, expires_at]);
}

// Make sure that when initializing there is no used old OTP
async function invalidateOTP(email){
  const result = await pool.query(
    `UPDATE otps SET used=true WHERE email=$1`
  , [email]);
}

// Can be used to check existing otp
async function getOTP(email){
  const result = await pool.query(
    `SELECT otp FROM otps WHERE email=$1 and used=false and expires_at > NOW() ORDER BY id DESC LIMIT 1`
  , [email]);

  return result.rows[0];
}

// Get attempts
async function updateAttempts(email){
  const result = await pool.query(
    `UPDATE otps SET attempts=attempts+1 WHERE email=$1 AND used=false RETURNING attempts`
  , [email])

  return result.rows[0];
}

module.exports = { createOTP, invalidateOTP, getOTP, updateAttempts };
