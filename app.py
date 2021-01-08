import os
from flask import Flask, render_template, send_from_directory
from flask_restful import Api
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv

# from models.student import StudentModel
# from models.marks import MarksModel
from controllers.student import Student
from controllers.leaderboard import Leaderboard

load_dotenv()
app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'some_secret_key'
api = Api(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}},
            allow_headers=["Content-Type"], intercept_exceptions=False)


@app.route('/')
def index():
    # StudentModel.fetch_all(session)
    # student = StudentModel({"roll_no":1, "student_name":"test1"})
    # marks = MarksModel({"roll_no":1, "physics": 80, "chemistry": 90, "maths": 100})
    # print(student)
    # marks.save_to_db(session)
    # results = MarksModel.fetch_all(session)
    # print(results)
    return "API is Live!"

api.add_resource(Student, "/api/enter_marks")
api.add_resource(Leaderboard, "/api/leaderboard")

if __name__ == "__main__":
    app.run(debug=True)