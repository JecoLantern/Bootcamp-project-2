$(document).ready(function() {
  $("select").formSelect();

  //Validating Buy or Sell Form
  var $submitBtn = $("#submit");

  
  // Event Listener for Buy or Sell Submit Button
  // $submitBtn.on("click", validateForm);
});

//initialize modals and FABs
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});

  document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'right',
    hoverEnabled: false
  });
});
