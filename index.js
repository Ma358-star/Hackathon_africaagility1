require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
//const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./app/routes/auth.routes');
const businessRoutes = require('./app/routes/business.routes');
const receiptRoutes = require('./app/routes/receipt.routes');
const app = express();

let corsOptions = {
    origin: 'http://localhost:8000',
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
    credentials: true
};

app.use(cors(corsOptions));

//parse requests of content-type: application/json
app.use(express.json());
app.use(bodyParser.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.urlencoded({ extended: true}));

//parse cookies
app.use(cookieParser());

mongoose.connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connect to MongoDB.");
})
.catch(err => {
    console.error("Connection error: ", err);
    process.exit();
});

//simple route
app.get('/', (req, res) => {
    res.json({message: 'Welcome to InBook Platform.'});
})

app.use('/api/auth', userRoutes);
app.use('/api/auth', businessRoutes);
app.use('/api/auth', receiptRoutes);

let PORT = process.env.PORT;

if (PORT == null || PORT == '') {
    PORT = 8000;
}

app.listen(PORT, () => (
    console.log(`Server is running on port ${PORT}`)
));