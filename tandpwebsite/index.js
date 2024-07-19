const express = require('express');
const cors = require('cors');
const connectToMongodb = require('./database');
const path = require('path');

const app = express();
const port = 2025;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

// CORS headers for all routes
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Connect to MongoDB
connectToMongodb();
// Serve static files from the 'exports' directory
app.use('/exports', express.static(path.join(__dirname, 'Routes', 'exports')));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use("/api", require("./Routes/Corddetailsinsert"));
app.use("/api", require("./Routes/Checkcredentials"));
app.use("/api", require("./Routes/CompanyDetails"));
app.use("/api", require("./Routes/Changingsheettodata"));
app.use("/api", require("./Routes/Masterstudentdatabase"));

// Start the serve
app.listen(port, () => {
    console.log(`Backend is running on port ${port}`);
});
