const express = require("express");
const ctrlWrapper = require("../../utils/ctrlWrapper");
const { validateBody, authenticate } = require("../../middlewares");
const ctrl = require("../../controllers/auth");
const { schemas } = require("../../models/users/user");
const router = express.Router();

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSubscriptionJoiSchema),
  ctrlWrapper(ctrl.updateSubscription)
);
module.exports = router;