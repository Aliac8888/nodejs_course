exports.showErrorPage = (req, res, next) => {
  res.status(404).render("errors/404", {
    title: "404 Page Not Found",
  });
};
