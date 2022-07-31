async function logout(req, res, next) {
  console.log("POST /auth/logout api");
  try {
    await res.clearCookie("__session", {
      // domain: "luxury-items-staging.web.app",
      path: "/",
      signed: true,
      sameSite: "None",
      httpOnly: true,
      secure: true, // Disable this options when run on localhost
    });
    return res.status(200).json({ message: "You have logged out" });
  } catch (error) {
    console.log("Location: controllers/auth/logout.controller.js", error);
    res.status(400).json(error);
  }
}

export default logout;
