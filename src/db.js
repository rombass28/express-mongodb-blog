const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true});

let db = mongoose.connection;
db.on('open', () => {
	console.log('connect');
});

db.on('error', () => {
	console.log('error');
});