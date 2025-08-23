const { createUser, getUser, updateLastLogin } = require('../models/Users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register(req, res) {
  const { email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await createUser(email, passwordHash);

  res.status(201).json(user);
}

async function search(req, res){
  const { email } = req.body;

  // searh user
  const existing = getUser(email);

  if(!existing) return res.status(400).json({ success: false, msg: "Error in Searching"});

  return res.status(201).json({ success: true, data: existing,  msg: "Found Email" });
}

async function login(req, res) {
  const { email, password } = req.body;
  console.log(`Post Login: ${email}`);

  // Get Account
  const user = await getUser(email);
  if (!user) return res.status(400).json({ success: false, error: "Account Doesn't Exist" });
  
  console.log(`Fetch Account Data: ${user}`);

  // Verify password
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ success: false, error: "Password Doesn't Match" })

  console.log(`Verify Password Success`);

  await updateLastLogin(user.user_id);

  delete user.password;
  console.log(`Generating JWT`);
  const token = jwt.sign(
    { userId: user.user_id, userEmail: user.email, role: user.role },
    process.env.JWT_TOKEN,
    { expiresIn: "1h" }
  );

  console.log(process.env.JWT_TOKEN);

  console.log("Sending Data");
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: false, 
    sameSite: "lax",
    maxAge: 60 * 60 * 1000
  })

  res.status(201).json({ success: true, msg: "Logged In" });
}

async function logout(req, res) {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      sameSite: "lax"
    })
  } catch(error) {
    throw new Error("Failed to clear cookies");
  }
  
  res.status(201).json({ success: true, msg: "Successful Cleared Cookies" });
}

module.exports = { register, login, search, logout };

