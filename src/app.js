const express = require('express');
const cors = require('cors');
const personsRouter = require('./routes/persons');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/persons', personsRouter);

module.exports = app;
