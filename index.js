import "dotenv/config.js";
import express from "express";
import { InitiateMongoServer, InitiateFirebaseServices } from "./datasources/index.js";
import route from "./routes/index.js";
import { InitiatePaypal } from "./middlewares/index.js";
import { vars, corsOptions } from "./configs/index.js";
import passport from "passport";
import { initLocalPassport } from "./strategies/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const PORT = vars.port;
const SIGNED_COOKIE = vars.signedCookie;

InitiatePaypal();
InitiateMongoServer();
InitiatePaypal;
InitiateFirebaseServices();
const app = express();
initLocalPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use(cookieParser(SIGNED_COOKIE));
route(app);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
