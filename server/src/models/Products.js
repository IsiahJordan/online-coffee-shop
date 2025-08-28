const pool = require("../config/db.js");

async function getProducts(length){
  const result = await pool.query(
    `SELECT * FROM products LIMIT $1`
  , [length]);

  return result.rows; 
}
module.exports = { getProducts };
