var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {

  it('should generate correct message object.', () => {
    var from = 'SomeUser';
    var txt = 'This is my message.';
    var msg = generateMessage(from, txt);
    expect(msg.from).toEqual(from);
    expect(msg.text).toEqual(txt);
    expect(msg.createdAt).toExist().toBeA('number');
  });
});

describe('generateLocationMessage', () => {

  it('should generate correct message object', () => {
    var from = 'Dude';
    var loc = 12345;
    var lat = 67890;
    var url = `https://www.google.com/maps?q=${loc},${lat}`
    var locmsg = generateLocationMessage(from, loc, lat);
    expect(locmsg.createdAt).toExist().toBeA('number');
    expect(locmsg.from).toBe(from);
    expect(locmsg.url).toBe(url);
  });

});
