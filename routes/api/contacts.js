const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const ctrlWrapper = require("../../utils/ctrlWrapper");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/contacts/contact");
const { authenticate } = require("../../middlewares");

router.get("/", authenticate, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", authenticate, ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete("/:contactId", authenticate, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContactById)
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;