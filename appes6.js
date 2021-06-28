class Book {
    constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    }
}


class UI {
    addBookToList(book) {

    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);

    }


    showAlert(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div, form);
    // Disappear after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);

    }

    deleteBook(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();

    // Instantiate UI
    const ui = new UI();

    // Show message
    ui.showAlert('Book removed!', 'success');
    } 

    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';

    }

}

// Local storage class
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui = new UI;

            // Add book to UI
            ui.addBookToList(book);
        })
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));

    }

    static removeBook() {

    }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit',
function(e){
    // Get form values
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const isbn = document.getElementById('isbn').value;

    // Instantiate Book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if(title ==='' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error')

    } 
    
    else {
    
        // Add book to list
        ui.addBookToList(book);

        // Add to localStorage
        Store.addBook(book);

        // Show success
        ui.showAlert('Book Added!', 'success');

        // Clear fields
        ui.clearFields();
        }

    
     
    // console.log(book);

    e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click',
function(e){

    // Instantiate UI
    const ui = new UI();

    // Remove list
    ui.deleteBook(e.target);

    e.preventDefault();
});