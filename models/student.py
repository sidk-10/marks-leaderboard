from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime
from sqlalchemy.ext.declarative import declarative_base

from models.marks import MarksModel

Base = declarative_base()

class StudentModel(Base):
    """Student model."""

    __tablename__ = 'student_details'

    roll_no = Column(Integer, primary_key=True)
    student_name = Column(String(50))

    def __init__(self, data):
        self.roll_no = data["roll_no"]
        self.student_name = data["student_name"]

    def json(self):
        """
        :rtype: JSON.
        """
        return {
            'name': self.student_name,
            'roll_no': self.roll_no,
        }

    @classmethod
    def fetch_all(cls, session):
        try:
            result = session.query(cls).all()
            for i in range(len(result)):
                result[i] = result[i].json()
            session.close()
        except Exception as error:
            result = {
                "message": str(error)
            }
        return result

    @classmethod
    def check_in_db(cls, session, data):
        try:
            print("rno", data["roll_no"], type(data["roll_no"]))
            result = session.query(cls).filter(cls.roll_no == data["roll_no"]).all()
            print(result)
            if(len(result) > 0): 
                response = True
            else:
                response = False
        except Exception as error:
            response = {
                "message": str(error)
            }
        session.close()
        return response

    def save_to_db(self, session):
        """
        Inserts this student in the DB.
        """
        session.add(self)
        session.commit()
        session.close()

    def delete_from_db(self, session):
        """
        Deletes this student from the DB.
        """
        session.delete(self, session)
        session.commit()
        session.close()