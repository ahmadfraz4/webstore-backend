require("dotenv").config();
let cookieParser = require('cookie-parser')
require("./src/connection/conn");
let express = require("express");
let compression = require('compression')
let app = express();
app.use(compression());
let cors = require('cors')
let path = require('path')
let bodyParser = require('body-parser')
let {createServer} = require('http')
let {Server} = require('socket.io')

let serve = createServer(app);
let io = new Server(serve, {
  pingTimeout: 60 * 1000, // automatic close after 1 minute
  cors: {
    origin: "http://localhost:5173",
  },
});

// io.cors

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
let ErrorMiddleware = require("./src/middleware/error");
const { roomModel } = require("./src/models/chat.model");
let port = process.env.PORT || 3000;

// User router
app.use('/api/v1/user', require('./src/routers/UserRouter'));

// product router
app.use("/api/v1", require("./src/routers/ProductRouter"));

// order router
app.use("/api/v1",require("./src/routers/OrderRouter"));

// payment router
app.use('/api/v1', require('./src/routers/payment.router'))

// message router
app.use('/api/v1', require('./src/routers/message.router'))



app.use(express.static(path.join(__dirname, '/dist')));

app.get('*/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname , '/dist/robots.txt'));
});
app.get('*/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname , '/dist/sitemap.xml'));
});



app.get('*', (req, res) => {
  if(req.path == 'robots.txt'){
   return res.sendFile(path.join(__dirname , '/dist/robots.txt'));
  }
  res.sendFile(path.join(__dirname, '/dist', 'index.html'));
});

// sockets

io.on('connection',function (socket){
   // joining room
    socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
   });
  //  leave room
  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
  });

// recieving room id at the time of msg and forword it to join room of same id
   socket.on('message',async (roomId)=>{
  //  let isRoomExist = await roomModel.findById(roomId); 
    await io.to(roomId).emit('receive',roomId);

    // this will send the function to everyone including sender
    // io.emit('gettingRoom', roomId)

    // this will send all except sender
    socket.broadcast.emit('gettingRoom', roomId)
   });
   
  //  io.on('gettingRoom',function (id){
  //     console.log(id + 'g')
  //  })
   

})

// handling uncaught errors
process.on("uncaughtException", (err) => {
  // for common errors
  console.log(`Error ${err.message}`);
  console.log("shutting down server immediatly");
  process.exit(1);
});


app.use(ErrorMiddleware); // now i use it in full app
// console.log(Date.now())

// server listening
const server = serve.listen(port, () => {
  console.log(port);
});



// unhandled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the server immediatly`);
  server.close(() => {
    // when error , will close the server
    process.exit(1);
  });
});
