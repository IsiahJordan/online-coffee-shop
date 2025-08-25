const pool = require('../config/db');

// Create viewer role account 
async function createUser(email, password){
  const result = await pool.query(
    `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`,
    [email, password]
  );

  return result.rows[0];
}

// Get one user only 
async function getUser(email){
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  return result.rows[0];
}

// Only use after login
async function updateLastLogin(userid) {
  const result = await pool.query(
    `UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = $1 RETURNING *`,
    [userid]
  );

  return result.rows[0];
}

async function updatePassword(email, password) {
  const result = await pool.query(
    `UPDATE users SET password=$1 WHERE email=$2 RETURNING *`
  , [password, email]);

  return result.rows[0];
}

module.exports = { createUser, getUser, updateLastLogin, updatePassword };
