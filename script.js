const myLibrary = [];

function Book(name, author, pages, read) {
    // the constructor...
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.uniqueId = crypto.randomUUID();
}

Book.prototype.toggleRead = function () {
    this.read = !this.read
};

function addBookToLibrary(name, author, pages, read) {
    // take params, create a book then store it in the array 
    const newBook = new Book(name, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const library = document.getElementById("library");  // *
    library.innerHTML = "";

    myLibrary.forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book");
        bookElement.dataset.id = book.uniqueId;

        bookElement.innerHTML = `
            <h2>${book.name}</h2>
            <p>${book.author}</p>
            <p>${book.pages}</p>
            <p>${book.read ? "Read" : "Not Read"}</p>
            <button class="toggleReads">Toggle Read</button>
            <button class="addBook">New Book</button>
            <button class="remove">Remove</button>`;
        library.appendChild(bookElement);  // **

        // toggle read 
        bookElement.querySelector(".toggleReads").addEventListener("click", () => {
            book.toggleRead();
            displayBooks();
        });

        // remove book
        bookElement.querySelector(".remove").addEventListener("click", (e) => {
            const id = e.target.closest(".book").dataset.id;
            const index = myLibrary.findIndex(book => book.uniqueId === id);
            myLibrary.splice(index, 1);
            displayBooks();
        })

        // add book
        bookElement.addEventListener("submit", (event) => {
            event.preventDefault();

            addBookToLibrary(name, author, pages, read);
            displayBooks();
        })

    });



}




addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 2925, true);
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1178, false);





