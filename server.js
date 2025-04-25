const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors')
const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

// connect db
connectDB() // calls the connectDB function in db.js

// Init Middleware

app.use(express.json({
    extended:false
})) // parse JSON body

app.get('/', (req, res)=>res.send('API running'))

//Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/post', require('./routes/api/post'))
app.use('/api/auth', require('./routes/api/auth'))



const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`Server started on port: ${PORT}`));


