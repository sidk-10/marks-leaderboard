from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class MarksModel(Base):
    """Marks model."""

    __tablename__ = 'student_marks'

    roll_no = Column(Integer, primary_key=True)
    physics = Column(Integer)
    chemistry = Column(Integer)
    maths = Column(Integer)

    def __init__(self, data):
        self.roll_no = data["roll_no"]
        self.physics = data["physics"]
        self.chemistry = data["chemistry"]
        self.maths = data["maths"]

    def json(self):
        """
        :rtype: JSON.
        """
        return {
            'roll_no': self.roll_no,
            'physics': self.physics,
            'chemistry': self.chemistry,
            'maths': self.maths
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

    def save_to_db(self, session):
        """
        Inserts this marks in the DB.
        """
        session.add(self)
        session.commit()

    def delete_from_db(self, session):
        """
        Deletes this marks from the DB.
        """
        session.delete(self, session)
        session.commit()