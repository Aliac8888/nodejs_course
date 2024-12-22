exports.showErrorPage = (req, res, next) => {
  res.status(404).render("errors/404", {
    title: "404 Page Not Found",
    path: "",
    isLoggedIn: req.session.loggedIn,
  });
};

exports.handleServerError = (err, req, res, next) => {
  res.status(500).render("errors/500", {
    title: "Server Error",
    path: "",
    isLoggedIn: req.session.loggedIn,
  });
};
