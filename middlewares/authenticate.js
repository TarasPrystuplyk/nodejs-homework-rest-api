const jwt = require("jsonwebtoken");
const { User } = require("../models/users");

const { RequestError } = require("../utils");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw RequestError(401);
    }

    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      throw RequestError(401);
    }
    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = "Unuathorized";
    }
    next(error);
  }
};

module.exports = authenticate;