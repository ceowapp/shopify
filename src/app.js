// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
const multer = require('multer');

// Import routes
const indexRoutes = require('./routes/index');
const documentRoutes = require('./routes/documents');
const productRoutes = require('./routes/products');

// Express
var app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressLayouts);

// Disable caching
app.disable('etag');

// Middleware for parsing multipart/form-data
const upload = multer();
app.use(upload.none()); 

dotenv.config();

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));


// Root route
// Use routes
app.use('/', indexRoutes);
app.use('/documents', documentRoutes);
app.use('/products', productRoutes);


// Connections
var port = process.env.PORT || 9001;

mongoose.set('debug', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.once('open', function() {
  console.log('Connected to MongoDB at ', process.env.MONGODB_URI);
});

app.listen(port, function() {
  console.log('Listening on port ', port);
});

