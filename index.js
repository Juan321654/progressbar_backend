const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 3007;

app.get('/startProcess', (req, res) => {
     res.sendFile(__dirname + '/index.html');  // send the front-end page

     io.on('connection', (socket) => {
          // display the id of the connected socket 
          console.log('a user connected: ' + socket.id);


          let count = 0;
          const interval = setInterval(() => {
               if (count >= 100) {
                    clearInterval(interval);
                    socket.emit('done');
                    socket.disconnect(true);  // disconnect the socket once done
                    console.log('a user disconnected: ' + socket.id);
                    return;
               }
               count++;
               socket.emit('progress', { count });
          }, 100);
     });
});

server.listen(PORT, () => {
     console.log(`listening on *:${PORT}`);
});
