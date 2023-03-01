require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db.js');
const userRoutes = require('./routes/user');

// database connection
connection();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api/user', userRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on ${port}`));
