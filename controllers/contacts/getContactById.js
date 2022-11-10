const { Contact } = require("../../models/contacts/contact");
const { RequestError } = require("../../utils");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  console.log(req.params);
  const result = await Contact.findById(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  console.log(result);
  res.status(200).json(result);
};

module.exports = getContactById;