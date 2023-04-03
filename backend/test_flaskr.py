import os
import unittest
import json
from flask_sqlalchemy import SQLAlchemy

from flaskr import create_app
from models import setup_db, Question, Category


class TriviaTestCase(unittest.TestCase):
    def setUp(self):
        self.database_name = "trivia"
        self.database_path = "postgresql://{}/{}".format(
            'localhost:5432', self.database_name)
        self.app = create_app(self.database_path)
        self.client = self.app.test_client
        self.new_question = {
            'question': 'What is the capital of Vietnam?',
            'answer': 'Hanoi',
            'category': 3,
            'difficulty': 1
        }

    def tearDown(self):
        pass

    def test_get_questions_by_page(self):
        res = self.client().get('/questions')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['questions'])
        self.assertTrue(data['total_questions'])

    def test_404_request_beyond_valid_pages(self):
        res = self.client().get('/questions?page=2000')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], "resource not found !")

    def test_delete_question(self):
        with self.app.app_context():
            question = Question.query.first()
            res = self.client().delete(f'/questions/{question.id}')
            data = json.loads(res.data)

            self.assertEqual(res.status_code, 200)
            self.assertEqual(data['success'], True)
            self.assertEqual(data['question_id'], question.id)
            self.assertTrue(data['total_questions'])
            self.assertTrue(data['deleted'])

    def test_404_question_not_exist(self):
        res = self.client().delete('/questions/1000')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(
            data['message'], 'resource not found !')

    def test_add_question(self):
        res = self.client().post('/questions', json=self.new_question)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['created'])
        self.assertTrue(data['questions'])
        self.assertTrue(data['total_questions'])

    def test_405_if_book_creation_not_allowed(self):
        res = self.client().patch('/questions', json=self.new_question)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 405)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'method not allowed !')

    def test_get_question_search_with_results(self):
        res = self.client().post('/questions/search', json={"search": "What"})
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['questions'])
        self.assertTrue(data['total_questions'])

    def test_404_get_search_unavailable_question(self):
        response = self.client().post(
            '/questions/search', json={"search": "rehjtjuk"})
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'resource not found !')

    def test_get_categories(self):
        res = self.client().get('/categories')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['categories'])

    def test_get_question_by_category(self):
        res = self.client().get('/categories/2/questions')
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['questions'])
        self.assertTrue(data['total_questions'])
        self.assertTrue(data['current_category'])

    def test_404_get_question_beyond_valid_categories(self):
        res = self.client().get('/categories/69/questions')
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'resource not found !')

    def test_play_quiz_success(self):
        self.new_quiz = {
            'quiz_category': {'type': 'choose', 'id': 0},
            'previous_questions': [],
            'id': 1
        }
        response = self.client().post(
            '/quizzes', json=self.new_quiz)
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data['success'], True)
        self.assertTrue(data['question'])

    def test_play_quiz_failure(self):
        self.new_quiz = {
            'previous_questions': [],
            'id': None
        }
        response = self.client().post(
            '/quizzes', json=self.new_quiz)
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 422)
        self.assertEqual(data['success'], False)
        self.assertEqual(data['message'], 'request cannot be processed !')


        # Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()
