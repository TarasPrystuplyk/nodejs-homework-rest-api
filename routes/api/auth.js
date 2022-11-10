const express = require("express");
const ctrlWrapper = require("../../utils/ctrlWrapper");
const { validateBody, authenticate } = require("../../middlewares");
const ctrl = require("../../controllers/auth");
const { schemas } = require("../../models/users/user");
const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  validateBody(schemas.updateSubscriptionJoiSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));
module.exports = router;