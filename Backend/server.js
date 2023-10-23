const express = require("express");
const app = express();
const env = require("dotenv");
const cors = require('cors');
const dialogFlowRoutes = require('./routes/dialogFlowRoutes');
const makeCallRoute = require('./make-call');
const connectDB = require('./config/config');
const fileUploadRoutes = require('./routes/fileUploadRoutes');
const paymentRoute = require('./routes/paymentRouter');

// Environment variables
env.config();

app.use(express.json());
app.use(cors());

// routes
app.use('/api', dialogFlowRoutes);
app.use('/api', makeCallRoute);
app.use('/api', fileUploadRoutes);
app.use('/api', paymentRoute);

connectDB();

app.listen(process.env.PORT, () =>
  console.log(`Server Listening at port ${process.env.PORT}`)
);
