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

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
let ErrorMiddleware = require("./src/middleware/error");
let port = process.env.PORT || 3000;

// User router
app.use('/api/v1/user', require('./src/routers/UserRouter'));

// product router
app.use("/api/v1", require("./src/routers/ProductRouter"));

// order router
app.use("/api/v1",require("./src/routers/OrderRouter"));

// payment router
app.use('/api/v1', require('./src/routers/payment.router'))


app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client', 'index.html'));
});


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
const server = app.listen(port, () => {
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
