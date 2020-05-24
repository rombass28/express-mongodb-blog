const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const morgan = require('morgan');
const users = require('./controllers/users');
const mongoose = require('mongoose');

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


mongoose.connect('mongodb://localhost:27017/social', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', err => console.log(err));
db.once('open', () => console.log('connected to MongoDB'));

const User = new mongoose.model('User', {
	name: String,
	username: {
		type: String,
		required: true
	},
	email: String,
	created: {
		type: Date,
		default: new Date()
	}
});

const Post = new mongoose.model('Post', {
	userId: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: new Date()
	}
});

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//USERS API

app.put('/user', (req, res) => {
	const user = new User(req.body);
	user.save()
		.then((user) => res.status(201).json(user))
		.catch(err => res.status(400).json(err));
});

app.get('/user', (req, res) => {
	User.find()
		.then(users => res.json(users))
		.catch(err => res.json(err));
});

app.get('/user/:id', (req, res) => {
	User.findById(req.params.id)
		.then(user => {
			if (!user) {
				res.sendStatus(404);
				return;
			}
			res.json(user);
		})
		.catch(err => res.json(err));
});

app.post('/user/:id', (req, res) => {
	User.findById(req.params.id)
		.then(user => {
			if (!user) {
				res.sendStatus(404);
				return;
			}
			user.update(req.body)
				.then(() => res.sendStatus(200))
				.catch(err => res.status(400).json(err));
		})
		.catch(err => res.status(400).json(err));
});

app.delete('/user/:id', (req, res) => {
	User.findById(req.params.id)
		.then(user => {
			if (!user) {
				res.sendStatus(404);
				return;
			}
			user.remove()
				.then(() => res.status(204).json(err))
				.catch(err => res.status(400).json(err));
		})
		.catch(err => res.status(400).json(err));
});

//POSTS API

app.put('/Post', (req, res) => {
	const post = new Post(req.body);
	post.save()
		.then((post) => res.status(201).json(post))
		.catch(err => res.status(400.).json(err));
});

app.get('/post', (req, res) => {
	Post.find()
	.then(posts => res.json(posts))
	.catch(err => res.json(err));
});

app.get('/post/:id' , (req,res) => {
	Post.findById(req.params.id)
	.then(post => {
		if(!post) {
			res.sendStatus(404);
			return;
		}
		res.json(post);
	})
	.catch(err => res.json(err));
});

app.post('/post/:id', (req, res) => {
	Post.findById(req.params.id)
	.then(post => {
		if(!post) {
			res.sendStatus(404);
			return;
		}
		post.update(req.body)
		.then(post => res.sendStatus(200))
		.catch(err => res.status(400).json(err));
	})
	.catch(err => res.status(400).json(err))
});

app.delete('/post/:id', (req, res) => {
	Post.findById(req.params.id)
		.then(post => {
			if (!post) {
				res.sendStatus(404);
				return;
			}
			post.remove()
				.then(() => res.status(204).json(err))
				.catch(err => res.status(400).json(err));
		})
		.catch(err => res.status(400).json(err));
});

app.get('/user/:id/posts', (req, res) => {
	Post.find({
		userId: req.params.id
	})
	.then(post => res.json(post))
	.catch(err => res.json(err));
})


app.listen(port, () => console.log(`Server listening on port ${port}!`));

