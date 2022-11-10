const { Contact } = require("../../models/contacts/contact");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite = false } = req.query;
  const skip = (page - 1) * limit;
  const ownerParams = { owner };
  if (favorite === true) {
    ownerParams.favorite = true;
  }
  const result = await Contact.find(ownerParams, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");
  res.status(200).json(result);
};

module.exports = listContacts;