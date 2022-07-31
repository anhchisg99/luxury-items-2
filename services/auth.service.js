import jwt from "jsonwebtoken";
import { vars } from "../configs/index.js";
export function generateToken(email, userId, role) {
  const payload = {
    email,
    userId,
    role,
  };
  const token = jwt.sign(payload, vars.jwtKey);
  return token;
}
