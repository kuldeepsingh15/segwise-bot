const express = require('express');
const cors = require('cors');
const privateRoutes = require('./routes/private');
const publicRoutes = require('./routes/public');
// const models = require('./models');
// const generalConfigs = require("./config/general-configs");
const dotenv = require("dotenv");
//const { createClient } = require('redis');

dotenv.config();

// const redisClient = createClient({ url: `redis://${process.env.CACHE_DB_USER}:${process.env.CACHE_DB_PASS}@${process.env.CACHE_DB_HOST}:${process.env.CACHE_DB_PORT}` });
// redisClient.on('error', err => console.log(`Redis Client Error: ${err.stack ? err.stack : err}`));

// try {
//   (startDataSources = async() => {
//     await models.sequelize.authenticate();
//     global.redisClient = redisClient;
//     await global.redisClient.connect();
//     console.log('All Data sources initiated successfully')
//   })();
// } catch(err) {
//   console.log('Unable to initiate all data sources:', err);
// }

const initializeServer = port => {
  try {
    const server = express();
    server.use(cors());
    server.use(express.json({ extended: false, limit: '20mb' }));
    server.use('/api/v1/public/', publicRoutes);
    server.use('/api/v1/private/', privateRoutes);

    server.listen(port, () => console.log(`Server instance listening @port: ${port}`));
    return server;
  } catch (err) {
    console.log('Unable to initialize server:', err);
  }
};

module.exports = initializeServer(5000);