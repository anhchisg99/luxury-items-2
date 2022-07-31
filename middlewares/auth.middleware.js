import jwt from "jsonwebtoken";
import { vars } from "../configs/index.js";
import passport from "passport";

export async function verifyToken(req, res, next) {
  console.log(JSON.parse(JSON.stringify(req.signedCookies)));
  req.signedCookies = JSON.parse(JSON.stringify(req.signedCookies));
  if (req.signedCookies["__session"] && req.signedCookies["__session"].startsWith("Bearer")) {
    const accessToken =
      req.signedCookies["__session"] && req.signedCookies["__session"].split(" ")[1];
    try {
      if (accessToken) {
        const user = jwt.verify(accessToken, vars.jwtKey);
        if (user) {
          req.user = user;
          next();
        } else {
          console.log("Location: middlewares/auth.middleware.js -> invalid access token");
          return res.status(401).json({ message: "Unauthorized" });
        }
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      console.log("Location: middlewares/auth.middleware.js -> ", error.message);
      if (error.name === "JsonWebTokenError") {
        res.status(401).json({ message: "Unauthorized" });
      }
    }
  } else return res.status(401).json({ message: "Unauthorized" });
}

export async function verifyLogin(req, res, next) {
  let { email, password, fcm = "" } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Invalid body" });
  }
  try {
    req.body.email = req.body.email.toLowerCase();
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        console.log("Location: middlewares/auth.middleware.js", err);
        res.status(400).json(err);
      }
      if (!user) {
        console.log("Invalid email or password");
        res.status(400).json({
          message: "Invalid email or password",
        });
      } else {
        req.login(user, function (err) {
          if (err) {
            return next(err);
          }
          user.fcm = fcm;
          user.save();
          req.user = user;
          next();
        });
      }
    })(req, res, next);
  } catch (error) {
    console.log("Location: middlewares/auth.middleware.js", error);
    res.status(400).json(error);
  }
}
