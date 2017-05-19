var socket = io();

socket.on('connect', function () {
  console.log('Connected to server.');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

socket.on('newMessage', function (message) {
  var msgtxt = Mustache.render(jQuery('#message-text-template').html(), {text : message.text});
  jQuery('#messages').append(newMessageBody(message.from, message.createdAt, msgtxt));
});

socket.on('newLocationMessage', function (message) {
  link = Mustache.render(jQuery('#message-location-template').html(), {url: message.url});
  jQuery('#messages').append(newMessageBody(message.from, message.createdAt, link));
});

jQuery('#message-form').on('submit', function (event) {
  event.preventDefault(); // Don't refresh.
  var messageTxt = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'Anonymous',
    text: messageTxt.val()
  }, function () {
    messageTxt.val('');
  });
});

var newMessageBody = function (from, timestamp, messageHtml) {
  return Mustache.render(jQuery('#message-template').html(), {
    from,
    createdAt: moment(timestamp).format("h:mm A"),
    messageHtml
  });
}

var locationButton = jQuery('#send-location')
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  locationButton.attr('disabled','disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      locationButton.removeAttr('disabled').text('Send location');
    }, function (error) {
      alert('Unable to fetch location')
    });
});
