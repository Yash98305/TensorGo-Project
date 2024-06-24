const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    plans: [], 
});

module.exports = mongoose.model('Service', serviceSchema);