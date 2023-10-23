const mongoose = require('mongoose');

const registrationSchema = mongoose.Schema({
    name: String,
    email: String,
    registerDate: Date
});

mongoose.model('registration', registrationSchema);