document.addEventListener("DOMContentLoaded", function(){
  var elm = document.getElementById('save_token');
  elm.addEventListener('click', function(){
    var input = document.getElementById('token_input');
    localStorage.setItem('token', input.value);
  })
});