var expect = require('expect');

var {generateMessage} = require('./message');

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
