const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const {mongooose} = require('./database');
//settings
app.set('port', (process.env.PORT || 3000));
//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/notes',require('./routes/note.routes'));
//static files
app.use(express.static(path.join(__dirname,'tarjetas_de_colores')));
//listen
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});