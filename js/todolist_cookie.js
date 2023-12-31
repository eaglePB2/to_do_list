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
      li.innerHTML += '<i class="fas fa-times close"></i>';
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

// Update the setupOnClose function to use event delegation for the Font Awesome icon
function setupOnClose() {
  var list = document.getElementById('myUL');
  list.addEventListener('click', function(ev) {
    if (ev.target.classList.contains('close')) {
      var div = ev.target.parentElement;
      div.style.display = 'none';
      saveItemsToCookie(); // Save the updated list to the cookie
    }
  });

  // Check if the Font Awesome icon is already added to each list item
  var listItems = document.querySelectorAll('ul li');
  listItems.forEach(function(li) {
    var closeIcon = li.querySelector('.close');
    if (!closeIcon) {
      // If the close icon is not present, add it
      li.innerHTML += '<i class="fas fa-times close"></i>';
    }
  });
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
    li.innerHTML += '<i class="fas fa-times close"></i>';
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
