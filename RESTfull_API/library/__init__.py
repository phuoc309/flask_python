from flask import Flask, request, Blueprint, render_template, url_for
from library.books.controller import books
from library.borrow.controller import borrow
from library.category_author.controller import author_cat
from library.extension import db, ma
from library.model import Students, Books, Author, Category, Borrows
import os


def create_db(app):
    if not os.path.exists("library/library.db"):
        db.create_all(app=app)
        print("Created DB!")


def create_app(config_file="config.py"):
    app = Flask(__name__, template_folder='..//front-end/templates', static_folder='..//front-end/static')
    db.init_app(app)
    ma.init_app(app)
    app.config.from_pyfile(config_file)
    create_db(app)
    app.register_blueprint(books)
    app.register_blueprint(borrow)
    app.register_blueprint(author_cat)
    @app.route('/home')
    @app.route('/')
    def home():
        return render_template("home.html")
    return app
