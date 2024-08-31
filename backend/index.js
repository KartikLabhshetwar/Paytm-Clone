const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();

// Update CORS configuration
app.use(cors({
    origin: 'https://paytm-clone-frontend.onrender.com', // Replace with your frontend URL
    credentials: true
}));

app.use(express.json());

const mainRoute = require("./routes/index");
app.use("/api/v1/", mainRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
