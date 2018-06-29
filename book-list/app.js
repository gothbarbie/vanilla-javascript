// Book Constructor
function Book(title, author, isbn) {
  this.title = title
  this.author = author
  this.isbn = isbn
}

// UI Constructor
function UI() {}

// Add Book to List
UI.prototype.addBookToList = function(book) {
  const listEl = document.getElementById('book-list')
  const rowEl = document.createElement('tr')
  rowEl.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `
  listEl.appendChild(rowEl)
}

// Delete Book
UI.prototype.deleteBook = function(target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove()
  }
}

// Clear fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = ''
  document.getElementById('author').value = ''
  document.getElementById('isbn').value = ''
}

// Show alert
UI.prototype.showAlert = function(message, className) {
  const divEl = document.createElement('div')
  divEl.className = `alert ${className}`
  divEl.appendChild(document.createTextNode(message))

  const containerEl = document.querySelector('.container')
  const formEl = document.querySelector('#book-form')
  containerEl.insertBefore(divEl, formEl)

  setTimeout(function() {
    document.querySelector('.alert').remove()
  }, 3000)
}

// Event Listener for Add Book
document.getElementById('book-form').addEventListener('submit', function(e) {
  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const isbn = document.getElementById('isbn').value

  const book = new Book(title, author, isbn)

  const ui = new UI()

  // Validate
  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in all fields.', 'error')
  } else {
    ui.addBookToList(book)
    ui.clearFields()
  }

  e.preventDefault()
})

// Event Listener for Delete
document.getElementById('book-list').addEventListener('click', function(e) {
  const ui = new UI()

  ui.deleteBook(e.target)
  ui.showAlert('Book Removed', 'success')

  e.preventDefault()
})
