function pingWithAuth(req, res, next) {
  console.log("GET /ping/with-auth api");
  res.send("pong");
}

export default pingWithAuth;
