getBookApi = "http://127.0.0.1:5000/book-management/books"
getBookByNameApi = "http://127.0.0.1:5000/book-management/find-books/"
addBookApi = "http://127.0.0.1:5000/book-management/book"
getBookById = "http://127.0.0.1:5000/book-management/book/"
getBookDetailApi = "http://127.0.0.1:5000/category-management/author-category/"
updateBookApi = "http://127.0.0.1:5000/book-management/book"
deleteBookApi = "http://127.0.0.1:5000/book-management/book"
getAuthorApi = "http://127.0.0.1:5000/author-management/authors"
getCategoryApi = "http://127.0.0.1:5000/category-management/categories"

function start() {
    loadBook();
    loadAuthor();
    loadCategory();
    handleLoadBookByName();
    handleCreateForm();
    handleUpdateForm();
    handleDeleteForm();
    homePage();
}

start()

function homePage() {
    document.getElementById("home").onclick = function () {
        location.href = "/home";
    }
}

function loadBook(){
    var titleTable =
    " <tr> <th>Id</th> <th>Name</th> <th>Page Count</th> </tr> "
    fetch(getBookApi)
        .then(function(response){
            return response.json();
        })
        .then(function(books){
            var htmls = books.map(function(book){
                return `<tr>
                <td>${book.id}</td>
                <td>${book.name}</td>
                <td>${book.page_count}</td>
                </tr>
                `
            })
            var html = titleTable + htmls.join('')
            document.getElementById("book-block").innerHTML = html
        })
        .then(addRowHandlers)
        .catch(function(error){
            return error;
        })
    }

function loadAuthor(){
    fetch(getAuthorApi)
        .then(function(response){
            return response.json();
        })
        .then(function(authors){
            var htmls = authors.map(function(author){
                return `
                    <option value="${author.id}">${author.name}</option>
                `
            })
            html = '<option value=""></option>' + htmls.join('')
            document.getElementById("author").innerHTML = html
        })
        .catch(function(error){
            return error;
        })
    }

function loadCategory(){
    fetch(getCategoryApi)
        .then(function(response){
            return response.json();
        })
        .then(function(cats){
            var htmls = cats.map(function(cat){
                return `
                    <option value="${cat.id}">${cat.name}</option>
                `
            })
            html = '<option value=""></option>' + htmls.join('')
            document.getElementById("category").innerHTML = html

        })
        .catch(function(error){
            return error;
        })
    }

function createBook(data, callback){
    var options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(addBookApi, options)
        .then(function(response){
            return response.json()
        })
        .then(callback)
        .catch(function(error){
            console.log(error)
        })
}


function handleCreateForm(){
    var create = document.querySelector('#create');

    create.onclick = function() {
        var name = document.querySelector('input[name="name"]').value
        var pageCount = document.querySelector('input[name="page-count"]').value
        var authorId = document.querySelector('select[name="author"]').value
        var catId = document.querySelector('select[name="category"]').value
        if (name && pageCount > 0 && authorId && catId)
        {
            data = {
                name: name,
                page_count: pageCount,
                author_id: parseInt(authorId),
                category_id: parseInt(catId)
            }
            createBook(data, loadBook)
        }
        else {
            alert("Invalid value")
        }

    };
}

function updateBook(data, callback) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(updateBookApi, options)
        .then(function(response){
            return response.json()
        })
        .then(callback)
        .catch(function(error){
            console.log(error)
        })
}

function handleUpdateForm(){
    var update = document.querySelector('#update');

    update.onclick = function() {
        var name = document.querySelector('input[name="name"]').value
        var pageCount = document.querySelector('input[name="page-count"]').value
        var authorId = document.querySelector('select[name="author"]').value
        var catId = document.querySelector('select[name="category"]').value
        if (pageCount > 0 || authorId)
        {
            data = {
                name: name,
                page_count: pageCount,
                author_id: parseInt(authorId)
            }
            updateBook(data, loadBook)
            alert("Book updated")
        }
        else {
            alert("Invalid value")
        }

    };
}

function deleteBook(data, callback) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(deleteBookApi, options)
        .then(function(response){
            return response.json()
        })
        .then(callback)
        .catch(function(error){
            console.log(error)
        })
}

function handleDeleteForm(){
    var update = document.querySelector('#delete');
    update.onclick = function() {
        var name = document.querySelector('input[name="name"]').value
        if (name)
        {
            data = {
                name: name,
            }
            fetch(deleteBook(data, loadBook))
                .then(function(response) {
                    if (response.status == 404)
                        alert('Book deleted')
                })
        }
        else {
            alert("Invalid value")
        }

    };
}

function loadBookByName(name){
    var titleTable =
    " <tr> <th>Id</th> <th>Name</th> <th>Page Count</th> </tr> "
    var API = `${getBookByNameApi}${name}`
    fetch(API)
        .then(function(response){
            return response.json();
        })
        .then(function(books){
            var htmls = books.map(function(book){
                return `<tr>
                <td>${book.id}</td>
                <td>${book.name}</td>
                <td>${book.page_count}</td>
                </tr>
                `
            })
            var html = titleTable + htmls.join('')
            document.getElementById("book-block").innerHTML = html
        })
        .then(addRowHandlers)
        .catch(function(error){
            alert("Can not found book!")
            return error;
        })
    }

function handleLoadBookByName() {
    var find = document.querySelector('#find');

    find.onclick = function() {
        var name = document.querySelector('input[name="name"]').value
        if (name)
        {
            loadBookByName(name)
        }
        else
            alert("Can not found book!")
    }
}

function addRowHandlers() {
    var table = document.getElementById("book-block");
    var rows = table.getElementsByTagName("tr");
    var cols = table.getElementsByTagName("th")
    for (var i = 1; i < rows.length; i++) {
        var currentRow = table.rows[i];
        var createClickHandler = function(row) {
            return function() {
                for (var j = 0; j < cols.length; j++) {
                    var cell = row.getElementsByTagName("td")[j].innerHTML;
                    if (j == 0) {
                        getBook(cell).then(result => {
                            document.querySelector('select[name="category"]').value = result[1]
                            document.querySelector('select[name="author"]').value = result[0]
                        })
                    }
                    else if (j == 1) {
                        document.querySelector('input[name="name"]').value = cell
                    }
                    else {
                        document.querySelector('input[name="page-count"]').value = cell
                    }
                }
            }
        }
        currentRow.onclick = createClickHandler(currentRow)
    }
}

function getBook(id) {
    var API = `${getBookById}${id}`
    var author_cat = []
    return fetch(API)
        .then(function(response) {
            return response.json()
        })
        .then(function(book) {
            author_cat.push(book.author_id)
            author_cat.push(book.category_id)
            return author_cat
        })
        .catch(function(error) {
            return error
        })
}

function getBookDetail(id) {
    var API = `${getBookDetailApi}${id}`
    fetch(API)
        .then(function(response) {
            return response.json()
        })
        .then(function(book) {
            var cat = book.Book_detail[2]
            return cat
        })
        .catch(function(error) {
            return error
        })
}