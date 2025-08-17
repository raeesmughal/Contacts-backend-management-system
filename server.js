const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler.js');
const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes.js');
const connectDB = require('./config/dbConnection.js');
const authMiddleware = require('./middleware/authMiddleware.js');


const app = express();
app.use(express.json());
connectDB();

app.get('/', (req, res) => {
    res.send('hello homepage');
})


app.use('/api/contacts', authMiddleware, contactRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler)


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server is running at : http://localhost:${PORT}`)
})