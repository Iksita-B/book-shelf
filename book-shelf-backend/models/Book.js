const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  genre: String,
  status: { type: String, enum: ['Need to read', 'Reading', 'Read'], default: 'Need to read' },
  startDate: Date,
  endDate: Date,
  description: String,
  reaction: {
    type: String,
    enum: ['😍', '🙂', '😐', '😞', '🤯', '😭', '😂'],
    default: ''
  }
  
});

module.exports = mongoose.model('Book', bookSchema);
