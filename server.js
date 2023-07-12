const express = require('express');
const cors = require('cors');
const privateRoutes = require('./routes/private');
const publicRoutes = require('./routes/public');
const dotenv = require("dotenv");

dotenv.config();

const initializeServer = port => {
  try {
    const server = express();
    server.use(cors());
    server.use(express.json({ extended: false, limit: '20mb' }));
    server.use('/api/v1/public/', publicRoutes);
    server.use('/api/v1/private/', privateRoutes);
    server.get("/healthCheck", (req,res) => {
      console.log("Healthy");
      res.status(200).send("Healthy");
    });
    server.listen(port, () => console.log(`Server instance listening @port: ${port}`));
    return server;
  } catch (err) {
    console.log('Unable to initialize server:', err);
  }
};

module.exports = initializeServer(5000);