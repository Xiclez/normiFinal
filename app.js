const express = require('express');
const connectDB = require('./db');

const app = express();
const port = process.env.PORT || 3005;

connectDB();

app.use(express.json());

const gameRoutes = require('./routes/gameRoutes');
app.use('/', gameRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
