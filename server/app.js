require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');

const UserRouter = require('./routers/user.router');
const DropRouter = require('./routers/drop.router');

const app = express();

// db connection
mongoose
   .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => {
      console.log('Connected to DB...');
   })
   .catch((err) => console.log(err));

require('./redis');

// middlewares
app.use(express.static(__dirname + '/build'));
// app.use(logger('dev'));
app.use(cors());
app.use(express.json());

// routes
app.use('/api/users', UserRouter);
app.use('/api/drops', DropRouter);
app.get('/', (req, res) => {
   res.sendFile('index.html');
});

// error handler
app.use((err, req, res, next) => {
   console.log(err.stack);
   res.status(500).json({ success: false, message: 'Internal server error!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`Server is running on http://127.0.0.1:${PORT}...`);
});
