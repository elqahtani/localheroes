// Connection into database
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/pahlawan';

mongoose.connect(mongoDB, {
    useMongoClient: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection refused:'));

// Schema
var Schema = mongoose.Schema;

var PahlawanSchema = new Schema({
    name: String,
    area: String,
    die: String,
    senjata: String,
});

module.exports = mongoose.model('Pahlawan', PahlawanSchema);