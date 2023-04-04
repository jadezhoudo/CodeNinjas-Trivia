from json import load
import os
import string
from unicodedata import category
from unittest import result
from flask import Flask, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import random
from sqlalchemy.orm import load_only
from sqlalchemy import select
from models import setup_db, Question, Category, db

QUESTIONS_PER_PAGE = 10


def paginate_results(request, results):
    page_num = request.args.get("page", 1, type=int)
    start_idx = (page_num - 1) * QUESTIONS_PER_PAGE
    end_idx = start_idx + QUESTIONS_PER_PAGE
    items = [result.format() for result in results]
    paginated_items = items[start_idx:end_idx]
    return paginated_items


def create_app(test_config=None):
    app = Flask(__name__)
    with app.app_context():
        setup_db(app)
        CORS(app, resources={r"/api/*": {"origins": "*"}})

        @app.after_request
        def after_request(response):
            response.headers.add(
                "Access-Control-Allow-Headers",
                "Content-Type,Authorization,true"
            )
            response.headers.add(
                "Access-Control-Allow-Methods",
                "GET,PUT,POST,DELETE,OPTIONS"
            )
            response.headers.add(
                "Access-Control-Allow-Origin", "*"
            )
            return response

        @app.route('/categories')
        def fetch_categories():
            categories = db.session.query(
                Category).order_by(Category.id).all()

            if not categories:
                abort(404)
            category_dict = {item.id: item.type for item in categories}
            return jsonify({
                'success': True,
                'categories': category_dict
            })

        @app.route('/questions')
        def fetch_questions():
            selection = db.session.query(Question).options(
                load_only(Question.question, Question.category))\
                .order_by(Question.id)
            categories = Category.query.all()
            questions = paginate_results(request, selection)
            if not questions:
                abort(404)

            total_questions = Question.query.count()
            total_categories = \
                {item.id: item.type for item in categories}
            return jsonify({
                "success": True,
                "questions": questions,
                "total_questions": total_questions,
                "current_category": 'All',
                "categories": total_categories
            })

        @app.route('/questions/<int:question_id>', methods=['DELETE'])
        def delete_question(question_id):
            question = Question.query.get_or_404(question_id)
            question.delete()

            total_questions = Question.query.count()

            return jsonify({
                'success': True,
                'deleted': question_id,
                'question_id': question_id,
                'total_questions': total_questions
            })

        @app.route('/questions', methods=['POST'])
        def post_question():
            data = request.get_json()

            if not all(key in data for key in
                       ('question', 'answer', 'category', 'difficulty')):
                abort(422)

            try:
                question = Question(
                    question=data['question'],
                    answer=data['answer'],
                    category=data['category'],
                    difficulty=data['difficulty']
                )
                question.insert()
                total_questions = Question.query.count()
                current_questions = paginate_results(
                    request, Question.query.all())

                return jsonify({
                    'success': True,
                    'created': question.id,
                    'questions': current_questions,
                    'total_questions': total_questions
                })
            except:
                abort(422)

        @app.route('/questions/search',  methods=['POST'])
        def find_questions():
            body = request.get_json()
            search_term = body.get('searchTerm', None)
            if search_term:
                questions_search = Question.query.filter(
                    Question.question.ilike(f'%{search_term}%')).all()
                formatted_questions = [question.format()
                                       for question in questions_search]
                return jsonify({
                    'questions': formatted_questions,
                    'total_questions': len(formatted_questions),
                    'current_category': None,
                    'success': True
                })
            else:
                abort(400)

        @app.route('/categories/<int:category_id>/questions')
        def get_questions_by_category(category_id):
            try:
                questions = Question.query.filter(
                    category_id == Question.category).all()
                paginated_questions = paginate_results(request, questions)
                categories = Category.query.all()
                if category_id > len(categories):
                    abort(404)

                return jsonify({
                    "success": True,
                    "questions": list(paginated_questions),
                    "total_questions": len(questions),
                    "current_category":
                    [cat.type for cat in categories if cat.id == category_id]
                })
            except:
                abort(404)

        @app.route('/quizzes', methods=['POST'])
        def start_quiz():
            body = request.get_json()
            quiz_category = body.get('quiz_category')
            previous_questions = body.get('previous_questions')
            question = auto_random_question(
                quiz_category['id'], previous_questions)
            if question is None:
                abort(404)
            return jsonify({
                'question': question.format(),
                'success': True,
            })

        def auto_random_question(category, previous_questions):
            if category == 0:
                questions = Question.query.filter(
                    Question.id.notin_((previous_questions))).all()
            else:
                questions = Question.query.filter_by(
                    category=category).filter(
                    Question.id.notin_((previous_questions))).all()
            if len(questions) == 0:
                return None
            else:
                return questions[random.randrange(0, len(questions))]

        @app.errorhandler(400)
        def handle_bad_request_error(error):
            return (
                jsonify({'success': False, 'error': 400,
                         'message': 'bad request'}),
                400
            )

        @app.errorhandler(405)
        def handle_not_allowed_error(error):
            return (
                jsonify({'success': False, 'error': 405,
                         'message': 'method not allowed !'}),
                405
            )

        @app.errorhandler(404)
        def handle_not_found_error(error):
            return (
                jsonify({'success': False, 'error': 404,
                         'message': 'resource not found !'}),
                404
            )

        @app.errorhandler(422)
        def unprocessable(error):
            return jsonify({
                'success': False,
                'error': 422,
                'message': 'request cannot be processed !'
            }), 422

    return app
