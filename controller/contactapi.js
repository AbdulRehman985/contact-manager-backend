const expressasync = require("express-async-handler");
const contacts = require("../models/contactModel.js");
const { Error } = require("mongoose");
// Get all contacts - GET /api/contact
const getContacts = expressasync(async (req, res) => {
  const contact = await contacts.find({ user_id: req.user.id });
  res.status(200).json(contact);
});

// Create a new contact - POST /api/contact
const createContact = expressasync(async (req, res) => {
  let { username, email, phone } = req.body;
  if (!username || !email || !phone) {
    res.status(400);
    throw new Error("All filed are required");
  }
  const contact = await contacts.create({
    username,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json(contact);
});

// Get single contact - GET /api/contact/:id
const getContact = expressasync(async (req, res) => {
  const contact = await contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  res.status(200).json(contact);
});

// Update contact - PUT /api/contact/:id
const UpdateContact = expressasync(async (req, res) => {
  const contact = await contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user is not allowed to update another contact");
  }
  const UpdateContact = await contacts.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(UpdateContact);
});

// Delete contact - DELETE /api/contact/:id
const DeleteContact = expressasync(async (req, res) => {
  const contact = await contacts.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  await contact.deleteOne();
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  UpdateContact,
  DeleteContact,
};
