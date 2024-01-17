const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const sequelize = require('./src/config/db');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes


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
