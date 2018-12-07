$(document).ready(function() {
  $("select").formSelect();
  // $(".modal").modal();

  //Validating Buy or Sell Form
  var $submitBtn = $("#submit");

  function validateForm() {
    var docForm = document.forms["buyorsellform"]["buyorsell"].value;
    if (docForm === "") {
      alert("Please Choose an Option!");
      return false;
    }
  }

  // Event Listener for Buy or Sell Submit Button
  $submitBtn.on("click", validateForm);
});
