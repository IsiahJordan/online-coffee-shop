const { getProducts } = require("../models/Products.js");
const { verifyToken } = require("../utility/security.js");

async function productList(req, res){
  const { limit } = req.body;

  const token = req.cookies.access_token;
  console.log(token);
  console.log("Checking Authorization");
  if(!token) return res.status(401).json({ success: false, msg: "Error: Not Authorized" });

  // Make sure that user is authenticated
  console.log("Verifying User Token");
  await verifyToken(token);

  const result = await getProducts(limit);
  
  if (!result) return res.status(400).json({ success: false, msg: "Error: get products failed" });

  res.status(200).json({ success: true, result: result, msg: "Successful Result" });
}

module.exports = { productList };
