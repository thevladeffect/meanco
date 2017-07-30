// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);


/**
 * socket.io init
 */
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('socket.io: a user connected');
  socket.on('disconnect', () => {
    console.log('socket.io: user disconnected');
  });

  socket.on('add', (item) => {
    io.sockets.emit('drawNew', item);
  });

  socket.on('remove', (item) => {
    io.sockets.emit('delete', item);
  });

  socket.on('edit', (item) => {
    io.sockets.emit('delete', item);
    io.sockets.emit('drawNew', item);
    io.sockets.emit('update', item);    
  });
});


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
