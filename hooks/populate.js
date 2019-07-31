let users = require('./users.json');
let posts = require('./posts.json');
let comments = require('./comments.json');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
let db;

MongoClient.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true})
	.then((client) => {
		db = client.db('blog');

		console.log('Connected to DB');
		console.log('Inserting fake data...');

		db.collection('users')
			.insertMany(users)
			.then(report => {
				users = report.ops;
				posts = posts.map(post => {
					post.userId = ObjectId(
						users[getRandomNumber(0, users.length - 1)]._id
					);
					post.createdAt = new Date(post.createdAt);
					return post;
				});
				return db.collection('posts').insertMany(posts);
			})
			.then(report => {
				posts = report.ops;
				comments = comments.map(comment => {
					comment.postId = ObjectId(
						posts[getRandomNumber(0, posts.length - 1)]._id
					);
					comment.createdAt = new Date(comment.createdAt);
					return comment;
				});
				return db.collection('comments').insertMany(comments);
			})
			.then(() => {
				console.log("\x1b[32m", 'DONE SUCCESSFULLY!', '\x1b[0m');
				process.exit(0);
			})
			.catch(err => console.log(err));
	})
	.catch((err) => console.log('Could not connect to DB', err));

function getRandomNumber(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}