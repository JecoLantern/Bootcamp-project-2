$(document).ready(function() {
  $("select").formSelect();
  // $(".modal").modal();

  var select = $("select");
  if (select.value) {
    return true;
  }
  return false;

  $("#buyorsellform").validate({
    rules: {
      buyorsell: { required: true }
    }
  });
});
