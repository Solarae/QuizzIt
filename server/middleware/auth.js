import jwt from "jsonwebtoken";

require("dotenv").config();

import { JWT_SECRET } from "../config.js";

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};

export default auth;
