from flask import Blueprint
from library.books.services import (add_book_service, get_book_by_id_service,
                                    get_all_books_service, update_book_by_id_service,
                                    delete_book_by_id_service, get_book_by_author_service,
                                    get_book_by_name_service)

books = Blueprint("books", __name__)


# add a new book

@books.route("/book-management/book", methods=['POST'])
def add_book():
    return add_book_service()


# get book by id


@books.route("/book-management/book/<int:id>", methods=['GET'])
def get_book_by_id(id):
    return get_book_by_id_service(id)


# get all book


@books.route("/book-management/books", methods=['GET'])
def get_all_books():
    return get_all_books_service()


# get book by name


@books.route("/book-management/find-books/<string:name>", methods=['GET'])
def get_book_by_name(name):
    return get_book_by_name_service(name)


# update book


@books.route("/book-management/book", methods=['PUT'])
def update_book_by_id():
    return update_book_by_id_service()


# delete book


@books.route("/book-management/book/", methods=['DELETE'])
def delete_book_by_id():
    return delete_book_by_id_service()


# get book by author


@books.route("/book-management/book/<string:author>", methods=['GET'])
def get_book_by_author(author):
    return get_book_by_author_service(author)
