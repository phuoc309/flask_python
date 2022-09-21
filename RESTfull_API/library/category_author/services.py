from library.model import Author, Category, Books
from library.extension import db
from library.library_ma import AuthorSchema, CatSchema
from flask import jsonify

Author_schema = AuthorSchema(many=True)
Cat_schema = CatSchema(many=True)

def get_all_authors_service():
    authors = Author.query.all()
    if authors:
        return Author_schema.jsonify(authors)
    else:
        return jsonify({"message": "Not found any authors"}), 404

def get_all_categories_service():
    cats = Category.query.all()
    if cats:
        return Cat_schema.jsonify(cats)
    else:
        return jsonify({"message": "Not found any categories"}), 404

def get_author_cat_by_id_service(id):
    result = db.session.query(Books.id, Books.name, Category.name, Author.name)\
                            .join(Category, Books.category_id == Category.id)\
                            .join(Author, Books.author_id == Author.id).filter(id == Books.id).first()
    if result:
        return jsonify({"Book_detail": list(result)}), 200
    else:
        return jsonify({"message": "Not found borrow!"}), 404