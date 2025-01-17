const express = require('express');
const server = express();
const accountRoutes = require('./routes/accountRoutes');
// Teach the server to read JSON
server.use(express.json())

// Custom Routes
server.use("/api/accounts", accountRoutes)

module.exports = server;