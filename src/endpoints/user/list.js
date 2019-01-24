const projectDb = require('../../db/user.js');

module.exports = {
  type: 'GET',
  url: 's/',
  handler: (req, res) => {
    projectDb.get()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Could not retrieve users.' });
      });
  },
};
