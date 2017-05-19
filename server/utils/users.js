
class Users {
  constructor () {
    this.users = [];
  };

  addUser (id, name, room) {
    var user = {
      id,
      name,
      room
    };
    this.users.push(user);
    return user;
  };

  removeUser(id) {
    var idx = this.users.findIndex((user) => user.id == id);
    if (idx === -1) {
      return undefined;
    } else {
      return this.users.splice(idx, 1)[0];
    }
  };

  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
  };

  getUserList(room) {
    var objs = this.users.filter((user) => user.room === room);
    return objs.map((obj) => obj['name']);
  };

};

module.exports = {Users};
