import passportLocal from "passport-local";
import { User } from "../models/index.js";

export function initLocalPassport(passport) {
  const LocalStrategy = passportLocal.Strategy;
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  passport.use(
    new LocalStrategy({ usernameField: "email" }, User.authenticate())
  );
}
