const multer = require('multer');

// Set up memory storage
const storage = multer.memoryStorage();

// Initialize multer with memory storage
const upload = multer({ storage: storage });
module.exports = {upload}