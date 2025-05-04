const express = require('express');
const connectDB = require('./db_config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path')
const app = express();

const _use = app.use.bind(app);
app.use = (path, ...handlers) => {
    console.log('app.use ->', path);
    return _use(path, ...handlers);
};

const _get = app.get.bind(app);
app.get = (path, ...handlers) => {
    console.log('app.get ->', path);
    return _get(path, ...handlers);
};


// ✅ Fix CORS here

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'x-auth-token'
    ],
    credentials: true
}));



app.use(cookieParser());
// Connect to DB
connectDB();

// Init middleware
app.use(express.json({ extended: false }));


// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/post', require('./routes/api/post'));
app.use('/api/auth', require('./routes/api/auth'));

//serve static assets in production 
if (process.env.NODE_ENV === 'production') {
    // serve React’s build folder
    app.use(express.static('client/build'));

    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
      });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server started on port: ${PORT}`));
