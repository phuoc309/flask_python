from flask import Blueprint
from library.category_author.services import get_all_authors_service, get_all_categories_service, \
    get_author_cat_by_id_service

author_cat = Blueprint('category', __name__)


@author_cat.route('/author-management/authors', methods=['GET'])
def get_all_authors():
    return get_all_authors_service()


# get all categories
@author_cat.route('/category-management/categories', methods=['GET'])
def get_all_categories():
    return get_all_categories_service()


# get author and category
@author_cat.route('/category-management/author-category/<int:id>', methods=['GET'])
def get_author_cat(id):
    return get_author_cat_by_id_service(id)
