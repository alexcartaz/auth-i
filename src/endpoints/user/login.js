const bcrypt = require('bcryptjs');
const userDb = require('../../db/user.js');
// const validators = require('../../validators/user/create.js');

module.exports = {
  type: 'POST',
  url: '/login/',
  handler: (req, res) => {
    const user = req.body;
    // const newKeys = Object.keys(newUser);
    // const validations = newKeys.map(key => validators[key](newUser));
    // Promise.all(validations).then(() => {
    userDb.getLogin(user.name)
      .then((returnedUser) => {
        console.log(returnedUser);
        if (returnedUser && bcrypt.compareSync(user.password, returnedUser.password)) {
          res.status(201).json(`welcome ${user.name}`);
        } else {
          res.status(400).json({ error: 'Not authenticated' });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'There was an error while saving the new user to the database.' });
      });
    // }).catch(err => res.status(err.statusCode || 500).json(err.stack));
  },
};
