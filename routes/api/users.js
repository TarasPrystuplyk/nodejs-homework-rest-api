const express = require("express");
const ctrlWrapper = require("../../utils/ctrlWrapper");
const { validateBody, authenticate, upload } = require("../../middlewares");
const ctrl = require("../../controllers/auth");
const { schemas } = require("../../models/users/user");
const router = express.Router();

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSubscriptionJoiSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;