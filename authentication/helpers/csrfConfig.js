const { doubleCsrf } = require("csrf-csrf");

const CSRF_SECRET = "super_csrf_secret";
const CSRF_COOKIE_NAME = "x-csrf-token";
const { invalidCsrfTokenError, generateToken, doubleCsrfProtection } =
  doubleCsrf({
    getSecret: () => CSRF_SECRET,
    cookieName: CSRF_COOKIE_NAME,
    cookieOptions: { sameSite: false, secure: false },
    getTokenFromRequest: (req) => {
      return req.body._csrf;
    },
  });

// Error handling, validation error interception
const csrfErrorHandler = (error, req, res, next) => {
  if (error == invalidCsrfTokenError) {
    res.status(403).json({
      error: "csrf validation error",
    });
  } else {
    next();
  }
};

module.exports = {
  generateToken,
  csrfErrorHandler,
  doubleCsrfProtection,
};
