const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();

const {
  validateBody,
  isValidId,
  validateBodyFavorite,
  authenticate,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.joiSchema),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.joiSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBodyFavorite(schemas.updateFavoriteSchema),
  ctrl.updateContact
);

module.exports = router;
