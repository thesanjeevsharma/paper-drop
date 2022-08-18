require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
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

app.use(express.json());
app.use(cors());

// routes
app.use('/api/users', UserRouter);
app.use('/api/drops', DropRouter);

// error handler
app.use((err, req, res, next) => {
   console.log(err.stack);
   res.status(500).json({ success: false, message: 'Internal server error!' });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
   console.log(`Server is running on http://127.0.0.1:${PORT}...`);
});
