const { createUser, getUser, updateLastLogin } = require('../models/Users.js');
const { signToken } = require('../utility/security.js');
const bcrypt = require('bcrypt');

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

// Sign token for used in quick transaction with short login session
async function temporary(req, res){
  const { email } = req.body;

  const data = { email: email, role: "temporary" };
  const token = signToken(data, "15m");

  res.status(201).json({ success: true, msg: "Send JWT token" });
}

// Verify password
async function verify(req, res) {
  const { email, password } = req.body;
  console.log(`Verifying Password From ${email}`);

  const user = await getUser(email);
  if (!user) return res.status(400).json({ success: false, action: "return", error: "Cannot Find Account" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ success: false, action: "retry", error: "Password Doesn't Match" });

  res.status(201).json({ success: true, msg: "Password Matches" });
}

async function updatePassword(req, res){
  const { email, password }  = req.body;
  console.log(`Updating Password for ${email}`);

  const result = await updatePassword(email, password);
  if(!result) return res.status(400).json({ success: false, action: "return", error: "User Cannot Be Found" });

  res.status(201).json({ success: true, msg: "Successful Update Password"});
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
  // Data that will be encrypted with the token
  const data = { userId: user.user_id, userEmail: user.email, role: user.role };

  // second params is the expiration of token
  const token = signToken(data, "1h");

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

module.exports = { register, login, search, temporary, verify, updatePassword, logout };
