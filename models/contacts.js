const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (allContacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = data ? JSON.parse(data) : [];
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const allContacts = await listContacts();

    const result = allContacts.find((item) => item.id === contactId);
    return result || null;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const allContacts = await listContacts();
    const id = String(contactId);
    const index = allContacts.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }

    const [result] = allContacts.splice(index, 1);
    await updateContacts(allContacts);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(body) {
  try {
    const allContacts = await listContacts();
    const newContact = {
      id: v4(),
      ...body,
    };

    allContacts.push(newContact);
    await updateContacts(allContacts);
    return newContact;
  } catch (error) {
    console.log(error);
  }
}
const updateContact = async (contactId, body) => {
  try {
    const allContacts = await listContacts();
    const idx = allContacts.findIndex((item) => item.id === contactId);
    if (idx === -1) {
      return null;
    }
    allContacts[idx] = { id: contactId, ...body };
    updateContacts(allContacts);
    return allContacts[idx];
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};






// const listContacts = async () => {}

// const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

// const updateContact = async (contactId, body) => {}

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }
