const mongoose = require('mongoose');

async function connect(uri) {
  await mongoose.connect(uri);
}

async function disconnect() {
  await mongoose.disconnect();
}

module.exports = { connect, disconnect };
