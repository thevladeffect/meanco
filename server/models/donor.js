const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI || 
    'mongodb://localhost/meanco';

mongoose.connect(mongoUri, (err, res) => {
    if (err) {
        console.log(`Error connecting to ${mongoUri}. ${err}`);
    } else {
        console.log(`Connected successfully to ${mongoUri}.`);
    }
});

const Schema = mongoose.Schema;

var DonorSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    bloodType: {
        type: String,
        required: true
    },
    location: {
        latitude: {
            type: Number,
            require: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    createdAt: Date,
    updatedAt: Date
});

DonorSchema.pre('save', function(next) {
    
  let currentDate = new Date();
  this.updatedAt = currentDate;
  if (!this.createdAt)
    this.createdAt = currentDate;
  next();
});

module.exports = mongoose.model('Donor', DonorSchema);
