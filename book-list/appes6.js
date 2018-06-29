class Book {
  constructor(title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
  }
}

class UI {
  addBookToList(book) {
    //
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

  showAlert(message, className) {
    //
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

  deleteBook(target) {
    //
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove()
    }
  }

  clearFields() {
    //
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isbn').value = ''
  }
}

class Store {
  static getBooks() {
    let books

    if (localStorage.getItem('books') === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }

    return books
  }

  static displayBooks() {
    const books = Store.getBooks()

    books.forEach(function(book) {
      const ui = new UI()

      ui.addBookToList(book)
    })
  }

  static addBook(book) {
    const books = Store.getBooks()

    books.push(book)

    localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook(isbn) {
    const books = Store.getBooks()
    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1)
      }
    })

    localStorage.setItem('books', JSON.stringify(books))
  }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks)

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
    Store.addBook(book)
    ui.addBookToList(book)
    ui.clearFields()
  }

  e.preventDefault()
})

// Event Listener for Delete
document.getElementById('book-list').addEventListener('click', function(e) {
  const ui = new UI()

  ui.deleteBook(e.target)
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
  ui.showAlert('Book Removed', 'success')

  e.preventDefault()
})
