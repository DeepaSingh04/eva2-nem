const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    contactId: { type: String, required: true, unique: true },

    email: { type: String, unique: true, sparse: true },

    phone: { type: String, unique: true, sparse: true },

    isPrimary: { type: Boolean, default: true },

    primaryContactId: { type: String, default: null },

});

module.exports = mongoose.model('Contact', contactSchema);