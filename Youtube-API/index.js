const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const sequelize = require('./src/config/db');

const { router: channelsRoutes } = require('./src/saved-channels/routes/channels');
const { router: videosRoutes } = require('./src/saved-videos/routes/videos');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/channels', channelsRoutes);
app.use('/api/videos', videosRoutes);

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
