const mongoose = require('mongoose');

const personSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 0 },
    deviceId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Person', personSchema);
