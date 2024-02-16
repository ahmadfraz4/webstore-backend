require('dotenv').config()
let mongoose = require('mongoose')
// process.env.MONGO_URI
// let mongoURI = 'mongodb://127.0.0.1:27017/ECommerce'
mongoose.connect(process.env.MONGO_URI).then(r=>console.log('connected to db'))


// for serverless..

// const mongoose = require('mongoose');
// let cachedDb = null;

// async function connectToDatabase() {
//   if (cachedDb) {
//     console.log('Using existing database connection');
//     return cachedDb;
//   } else {
//     console.log('Creating new database connection');
//     const db = await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
//     cachedDb = db;
//     return db;
//   }
// }

// exports.handler = async (event, context) => {
//   context.callbackWaitsForEmptyEventLoop = false;
  
//   await connectToDatabase();
//   // Your handler logic here
// };
