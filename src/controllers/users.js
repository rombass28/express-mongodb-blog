const User = require('../models/user');

module.exports = {
	getAll: (req, res) => {
		User.find()
			.then(users => res.json(users));
	},
	createUser: (req, res) => {
		const user = new User(req.body);
		user.save()
			.then(user => res.status(201).json(user))
			.catch(err => res.status(400).json(err));
	},
	deleteUser: (req, res) => {
		User.findById(req.params.id)
			.then(user => {
				if(user) {
					user.delete()
						.then(() => res.status(204).send())
						.catch(() => res.status(500).send());
				} else {
					res.status(404).send();
				}
			})
		;
	}
};