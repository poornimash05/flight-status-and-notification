import os

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql://postgres:8825@localhost/FlightStatus'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
