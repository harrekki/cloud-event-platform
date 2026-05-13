const requireTitle = (title) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({
        message: "Authentication required",
        });
    }

    if (req.user.title !== title) {
      return res.status(403).json({
        message: "Access denied",
      });
    }
    next();
  };
};

module.exports = {
  requireTitle,
};