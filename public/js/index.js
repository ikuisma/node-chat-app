var socket = io();

socket.on('connect', function () {
  console.log('Connected to server.');

});

socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

socket.on('newMessage', function (message) {
  console.log('The message:', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (event) {
  event.preventDefault();
  socket.emit('createMessage', {
    from: 'Anonymous',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
