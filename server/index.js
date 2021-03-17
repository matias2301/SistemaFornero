const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

//create server
const app = express();

//connect to AdminProject DB
connectDB();

//app port
const port = process.env.PORT || 4000;

//enable cors
app.use(cors());

//enabled body-parser
app.use( express.json({ extended: true }));

//routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/project', require('./routes/projects'));
app.use('/api/task', require('./routes/tasks'));

//listen port
app.listen( port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});