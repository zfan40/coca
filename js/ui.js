$(document).ready(function(){ // must have this line...
$("#pushbutton" ).mousedown(function() {
  $("#pushbutton").attr("src","image/asianfuse/push2.png");
  soda.fill();
  console.log("pushbutton pushed");
  return false;
});
$("#pushbutton" ).mouseup(function() {
  $("#pushbutton").attr("src","image/asianfuse/push1.png");
  soda.stop();
  console.log("pushbutton released");
});
});