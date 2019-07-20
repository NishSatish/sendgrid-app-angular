const mongoose = require('mongoose');

const emailSchema = mongoose.Schema({
  from: { type: String }
},
{
  strict: false
});

module.exports = mongoose.model('Email', emailSchema);
