require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Asegúrate de importar 'path'
const morgan = require('morgan');

const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); // Nueva ruta
const adminRoutes = require('./routes/adminRoutes');
const errorHandler = require('./middleware/errors');

const app = express();

// Static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Nueva ruta
app.use('/api/admin', adminRoutes);
app.use(errorHandler);

module.exports = app;
