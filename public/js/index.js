var setRoom = function(elem){
  console.log($(elem).text());
  jQuery("input[name='room']").val($(elem).text());
};
