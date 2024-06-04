const express = require('express');
const connectDB = require('./db');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3005;

connectDB();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8080', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));

const gameRoutes = require('./routes/gameRoutes');
app.use('/', gameRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
