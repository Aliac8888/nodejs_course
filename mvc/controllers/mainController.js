exports.getHomePage = (req, res, next) => {
  res.render("pages/main", { title: "HOME PAGE" });
};