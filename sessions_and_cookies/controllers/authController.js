exports.getLoginPage = (req, res, next) => {
  res.render("pages/auth/login", { title: "LOGIN PAGE", path: "/login" });
};
