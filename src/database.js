const mongooose = require('mongoose');
const URI = 'mongodb://localhost/notesapp';
mongooose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));
module.exports = mongooose;