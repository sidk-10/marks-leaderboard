import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

engine = create_engine('mysql+pymysql://{}:{}@db4free.net:3306/marksleaderboard'.format(os.getenv("USERNAME"), os.getenv("PASSWORD")))
session = sessionmaker(engine)
session = session()