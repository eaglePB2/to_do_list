// Click on a close button to hide the current list item
function setupOnClose() {
  var close = document.getElementsByClassName('close')
  for (var i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement
      div.style.display = 'none'
    }
  }
}

function newElement() {
  var li = document.createElement('li');
  var inputValue = document.getElementById('myInput').value.trim();
  
  // Sanitize the input value
  var textNode = document.createTextNode(inputValue);
  li.appendChild(textNode);
  
  if (inputValue === '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: 'Error Code: NullInputException'
    });
  } else {
    document.getElementById('myUL').appendChild(li);
    document.getElementById('myInput').value = '';
    li.innerHTML += '<span class="close">\u00D7</span>';
    setupOnClose();
  }
}


// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul')
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
	  ev.target.classList.toggle('checked')
  }
}, false)