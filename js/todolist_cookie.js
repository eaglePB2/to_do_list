// Load saved to-do list items from the cookie
function loadSavedItems() {
  var savedItems = getCookie('todoItems');
  if (savedItems) {
    var items = JSON.parse(savedItems);
    items.forEach(function(item) {
      var li = document.createElement('li');
      li.textContent = item.text;
      if (item.checked) {
        li.classList.add('checked');
      }
      li.innerHTML += '<span class="close">\u00D7</span>';
      document.getElementById('myUL').appendChild(li);
    });
    setupOnClose();
  }
}

// Save to-do list items and their status in the cookie
function saveItemsToCookie() {
  var items = [];
  var listItems = document.querySelectorAll('ul li');
  listItems.forEach(function(li) {
    var item = {
      text: li.textContent,
      checked: li.classList.contains('checked')
    };
    items.push(item);
  });
  setCookie('todoItems', JSON.stringify(items));
}

// Click on a close button to hide the current list item
function setupOnClose() {
  var close = document.getElementsByClassName('close');
  for (var i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = 'none';
      saveItemsToCookie(); // Save the updated list to the cookie
    };
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
    saveItemsToCookie(); // Save the updated list to the cookie
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    saveItemsToCookie(); // Save the updated status to the cookie
  }
}, false);

// Function to set a cookie
function setCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + value + expires + '; path=/';
}

// Function to get a cookie value by name
function getCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Load saved items from the cookie when the page loads
loadSavedItems();
