// Project Dependencies Imports
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

// Relative Imports
const routes = require('./routes');

// Instance of Express
const app = express();

// Allowing CORS for everyone
app.use(cors());

// Instance of SocketIO (websocket)
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Constants
const url = 'mongodb+srv://omnistack:omnistack@cluster0-amfef.mongodb.net/omnistack?retryWrites=true';

io.on('connection', socket => {
  socket.on('connectRoom', box => {
    socket.join(box);
  })
})

mongoose.connect(url, {
  useNewUrlParser: true,
});

/* app.use() serve para cadastrar um módulo dentro do express
   express.json() é um módulo que ajuda o express a entender as requisições
   que estão vindo em formato json.
   express.urlencoded é um módulo que ajuda o express a trabalhar com upload
   de arquivos, já que o json não nos permite fazer isso.
   req.io => criando um middleware que disponibiliza o websocket no express
*/
app.use((req, resp, next) => {
  req.io = io;
  return next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
app.use(routes);

server.listen(process.env.PORT || 3001);