const express = require("express");
const {
  getContacts,
  createContact,
  getContact,
  UpdateContact,
  DeleteContact,
} = require("../controller/contactapi");
const validToken = require("../middleware/validatetokenhandle");

const router = express.Router();
router.use(validToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(UpdateContact).delete(DeleteContact);
module.exports = router;
