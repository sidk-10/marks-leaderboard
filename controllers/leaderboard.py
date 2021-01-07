from flask import request
from flask_restful import Resource, reqparse
from webargs import fields
from webargs.flaskparser import use_args, parser, abort

from db import session
from models.student import StudentModel
from models.marks import MarksModel

class Leaderboard(Resource):
    """Analytics Leaderboard endpoint."""
    # student_args = {
    #     "roll_no": fields.Int(required=True),
    #     "student_name": fields.String(required=True),
    # }

    # @use_args(student_args, location="query")
    def get(self):
        response = []
        leaderboard = session.query(StudentModel, MarksModel).join(MarksModel, StudentModel.roll_no == MarksModel.roll_no).all()
        for row in leaderboard:
            # print(row[0].json(), row[1].json())
            response.append(row[0].json() | row[1].json())
        print(response)
        return response