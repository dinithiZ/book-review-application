const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const reviewRoutes = require('./routes/reviewRoutes');
app.use('/reviews', reviewRoutes);

 mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
