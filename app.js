const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const port = 8080;

const app = express();
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/index', (req, res) => { 
  res.render('index');
})

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const onMessage = () => {};

wss.on('connection', (ws, req) => {
  ws.on('message',(message) => {
    console.log('received to server: %s', message);
    ws.send('sending to client: ' + message);
  });
});

server.listen(port, () => {
  console.log('Listening on %d', server.address().port);
});