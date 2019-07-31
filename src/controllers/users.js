const ObjectId = require('mongodb').ObjectId;
const db = require('../db');

module.exports = {
	getAll: (req, res) => {
		db().collection('users')
			.find({})
			.toArray()
			.then(users => res.json(users));
	},
	createUser: (req, res) => {
		db().then().collection('users')
			.insertOne(req.body)
			.then(obj => res.status(201).json(obj.ops[0]));
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