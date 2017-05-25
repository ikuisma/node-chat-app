
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

  getUsers() {
    return this.users;
  };

  removeUser(id) {
    var idx = this.users.findIndex((user) => user.id == id);
    if (idx === -1) {
      return undefined;
    } else {
      return this.users.splice(idx, 1)[0];
    }
  };

  allRooms() {
    return Array.from(new Set(this.users.map((user) => user.room)));
  };

  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
  };

  userWithName(name) {
    return this.users.filter((user) => user.name === name)[0];
  };

  getUserList(room) {
    var objs = this.users.filter((user) => user.room === room);
    return objs.map((obj) => obj['name']);
  };
};

module.exports = {Users};
