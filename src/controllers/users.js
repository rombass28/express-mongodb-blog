const ObjectId = require('mongodb').ObjectId;
const db = require('../db');
const User = require('../models/user');

module.exports = {
	getAll: (req, res) => {
		db().collection('users')
			.find({})
			.toArray()
			.then(users => res.json(users));
	},
	createUser: (req, res) => {
		const user = new User(req.body);
		user.save()
			.then(user => res.status(201).json(user));
	},
	deleteUser: (req, res) => {
		db().collection('users')
			.findOne({_id: ObjectId(req.params.id)})
			.then(user => {
				if(user){
					db().collection('users')
						.deleteOne({_id: ObjectId(user._id)})
						.then(() => res.status(204).send())
				} else {
					res.status(404).send();
				}
			});
	}
};