const mongoose = require('mongoose');

const WhitelistEmailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
}, { collection: 'whitelistEmails', timestamps: true });

module.exports = mongoose.models.WhitelistEmail || mongoose.model('WhitelistEmail', WhitelistEmailSchema);