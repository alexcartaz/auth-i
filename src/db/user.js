const db = require('../dbConfig.js');

module.exports = {
  get: function(id) {
    let query = db('users').select('name', 'email');
    if (id) {
      return query
        .where('id', id)
        .first()
    }
    return query
  },
  insert: function(user) {
    return db('users')
      .insert(user)
      .then(([id]) => id);
     // {
     //   this.get(id);
      //});
  },
  getLogin: function(name) {
    let query = db('users');
    return query
      .where('name', name)
      .first()
  },
  /*
  update: function(id, changes) {
    return db('actions')
      .where('id', id)
      .update(changes)
      .then(count => (count > 0 ? this.get(id) : null));
  },
  remove: function(id) {
    return db('actions')
      .where('id', id)
      .del();
  },*/
};
