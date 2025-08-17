const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

// @desc Get all contacts 
// @route GET /api/contacts
// @access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ userId: req.user.id })
    res.status(200).json(contacts);
})



// @desc create new contact
// @route POST /api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;
    const userId = req.user.id;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error('All fields are mandatory')
    }
    const newContact = new Contact({ userId, name, email, phone });
    await newContact.save();

    res.status(200).json({
        message: 'create contact',
        body: req.body
    });
})




// @desc get contact
// @route GET /api/contacts/:id
// @access private
const getContact = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    if (contact.userId.toString() !== req.user.id.toString()) {
        res.status(403);
        throw new Error('You have not access to this contact, as you have not created this');
    }

    res.status(200).json(contact);
})


// @desc update contact
// @route PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    const userId = req.user.id;


    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }

    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error('All fields are mandatory')
    }

    if (contact.userId.toString() !== req.user.id.toString()) {
        res.status(403);
        throw new Error('You have not access to this contact, as you have not created this');
    }


    const toUpdate = { userId, name, email, phone };

    const updatedContact = await Contact.findByIdAndUpdate(id, toUpdate, {
        new: true,
        runValidators: true,
    });

    res.status(200).json(updatedContact);

})


// @desc delete contact
// @route DELETE /api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    if (contact.userId.toString() !== req.user.id.toString()) {
        res.status(403);
        throw new Error('You have not access to this contact, as you have not created this');
    }

    const deletedContact = await Contact.findByIdAndDelete(id);
    res.status(200).json({ message: `delete contact for ${id}` });
})





module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };