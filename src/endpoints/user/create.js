const express = require('express');
const userDb = require('../../db/user.js');
const validators = require('../../validators/user/create.js');
const bcrypt = require('bcryptjs');

module.exports = {
	type: 'POST',
	url: '/',
	handler: (req, res) => {
		const {name, password, email} = req.body;
		let newUser = {
	  		name: name,
	  		password: password,
	  		email: email,
	  	}
		const newKeys = Object.keys(newUser);
		const validations = newKeys.map(key => validators[key](newUser));
		Promise.all(validations).then(() => {
			//generate the hash from the user's password
			const hash = bcrypt.hashSync(newUser.password, 14);
			newUser.password = hash;
			userDb.insert(newUser)
			  .then(id => {
			  	console.log(id);
			  	res.status(201).json(id);
			  })
			  .catch(err => {
			  	console.log(err);
				res.status(500).json({ error: "There was an error while saving the new user to the database." });
			  });
		}).catch(err => res.status(err.statusCode || 500).json(err.stack));
	}
}
