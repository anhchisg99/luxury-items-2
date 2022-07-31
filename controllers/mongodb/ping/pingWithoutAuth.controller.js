// import { firebaseService } from "../../services/index.js";
function pingWithoutAuth(req, res, next) {
  // await firebaseService.generatePasswordResetLink("testaccount@yopmail.com");
  console.log("GET /ping api");
  res.send("pong");
}

export default pingWithoutAuth;
