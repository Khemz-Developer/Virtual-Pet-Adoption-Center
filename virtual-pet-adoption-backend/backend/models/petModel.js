const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  species: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  personality: {
    type: String,
    required: true,
    trim: true
  },
  mood: {
    type: String,
    default: 'Happy',
    enum: ['Happy', 'Excited', 'Sad']
  },
  adopted: {
    type: Boolean,
    default: false
  },
  adoption_date: {
    type: Date,
    default: null
  },
  creation_date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true 
});

// Create the Pet model
const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;