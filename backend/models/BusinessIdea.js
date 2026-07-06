const mongoose = require('mongoose');

const businessIdeaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    default: 'General',
  },
});

module.exports = mongoose.model('BusinessIdea', businessIdeaSchema);
