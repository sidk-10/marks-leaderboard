from flask import request
from flask_restful import Resource, reqparse
from webargs import fields
from webargs.flaskparser import use_args, parser, abort

from db import session
from models.student import StudentModel
from models.marks import MarksModel

class Student(Resource):
    """Analytics Leaderboard endpoint."""
    student_args = {
        "roll_no": fields.Int(required=True),
        "student_name": fields.String(required=True),
        "physics": fields.Int(required=True),
        "chemistry": fields.Int(required=True),
        "maths": fields.Int(required=True)
    }

    @use_args(student_args, location="query")
    def get(self, args):
        student = StudentModel({
            "student_name": args["student_name"],
            "roll_no": args["roll_no"]
        })    
        marks = MarksModel({
            "roll_no": args["roll_no"],
            "physics": args["physics"],
            "chemistry": args["chemistry"],
            "maths": args["maths"]
        })
        if StudentModel.check_in_db(session, args):
            response = {
                "status": "failed",
                "message": "roll no already exists"
            }
            return response
        StudentModel.save_to_db(student, session)
        MarksModel.save_to_db(marks, session)
        response = args
        response["status"] = "success"
        return response