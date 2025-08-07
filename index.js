require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const connectDB = require('./utils/db');

const app = express();

// Middleware
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Session setup (pull secret from env)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallbacksecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);

// Flash messages
app.use(flash());

// Routes
app.use('/', require('./routes/User'));
app.use('/admin', require('./routes/Admin'));

// Connect to DB and then start server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`🚀 Running on Port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err);
  });
