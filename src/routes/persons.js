const express = require('express');
const Person = require('../models/Person');

const router = express.Router();

// GET all persons
router.get('/', async (req, res) => {
  try {
    const persons = await Person.find().sort({ createdAt: -1 });
    res.json(persons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new person
router.post('/', async (req, res) => {
  try {
    const { name, age, deviceId } = req.body;
    if (!name || age === undefined || !deviceId) {
      return res.status(400).json({ error: 'name, age, and deviceId are required' });
    }
    const person = await Person.create({ name, age, deviceId });
    res.status(201).json(person);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST bulk upsert — used by mobile sync
router.post('/sync', async (req, res) => {
  try {
    const { records } = req.body;
    if (!Array.isArray(records)) {
      return res.status(400).json({ error: 'records must be an array' });
    }
    const saved = await Promise.all(
      records.map((r) =>
        Person.findOneAndUpdate(
          { _id: r._id || new (require('mongoose').Types.ObjectId)() },
          { name: r.name, age: r.age, deviceId: r.deviceId },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        )
      )
    );
    res.json({ synced: saved.length, records: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
