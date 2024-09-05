require('dotenv').config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();

// CORS configuration
const corsOptions = {
    origin: 'https://paytm-clone-frontend.onrender.com', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 204
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Log all incoming requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    next();
});

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json());

const mainRoute = require("./routes/index");
app.use("/api/v1/", mainRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(`${new Date().toISOString()} - Error:`, err);
    res.status(500).json({ message: 'Something went wrong on the server' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
