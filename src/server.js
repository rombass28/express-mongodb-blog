const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const morgan = require('morgan');
const users = require('./controllers/users');

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send();
});

app.get('/user', users.getAll);
app.put('/user', users.createUser);
app.delete('/user/:id', users.deleteUser);

app.listen(port, () => {
    require('./db');
    console.log(`Example app listening on port ${port}!`);
});