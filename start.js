const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

// Connect to database
mongoose.connect(process.env.DATABASE, { // get rid of deprecation warnings
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
mongoose.Promise = global.Promise; // use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🚫 → ${err.message}`);
});

// Require mongoose models here
require('./models/User');
require('./models/List');
require('./models/Task');
require('./models/Label');

// Start app
const app = require('./app');
const server = require('http').Server(app);

const port = process.env.PORT || 8000;
server.listen(port);

server.on('listening', () => {
  console.log(`Server listening on port: ${port}`)
});