const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const sequelize = require('./src/config/db');

const { router: usersRoutes } = require('./src/accounts/routes/users');
const { router: channelsRoutes } = require('./src/saved-channels/routes/channels');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/channels', channelsRoutes);

// Database synchronization
sequelize.sync()
  .then(() => {
    console.log('Database is synced');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// Start the server
const PORT = process.env.PORT || 80; // Use environment variable if available
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
