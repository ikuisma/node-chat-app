const expect = require('expect');
var {Users} = require('./users');

describe('Users', () => {

  var users;
  beforeEach(() => {
    users = new Users();
    users.addUser('123', 'abc', 'one');
    users.addUser('456', 'def', 'one');
    users.addUser('789', 'ghi', 'two');
  });

  it('should create a new empty list of users', () => {
    var u = new Users();
    expect(u.users).toEqual([]);
  });

  it('should add new user to list', () => {
    var users = new Users();
    var user = users.addUser('123', 'abc', 'huehuehue');
    expect(users.users).toNotEqual([]);
  });

  it('should find all users in room', () => {
    userlist = users.getUserList('one');
    expect(userlist).toNotEqual([]);
    expect(userlist.length).toBe(2);
  });

  it('should not find users in room that does not exist', () => {
    userlist = users.getUserList('Room that does not exist');
    expect(userlist).toEqual([]);
  });

  it('should return an array of names.', () => {
    expect(users.getUserList('one')[0]).toEqual('abc');
  });

  it('should return undefined when removing user that does not exist', () => {
    expect(users.removeUser('111')).toEqual(undefined);
  });

  it('should return removed user', () => {
    user = users.removeUser('123');
    expect(user).toExist();
    expect(user.name).toBe('abc');
  });

  it('should remove user from users list', () => {
    users.removeUser('123');
    expect(users.users.length).toBe(2);
  });

  it('should return undefined when getting user that does not exist', () => {
    expect(users.getUser('111')).toNotExist();
  });

  it('should get user that exists', () => {
    expect(users.getUser('123')).toExist();
    expect(users.getUser('123').name).toBe('abc');
  });

});
