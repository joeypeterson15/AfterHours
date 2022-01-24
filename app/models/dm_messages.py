from .db import db
from sqlalchemy.sql import func

class DMMessage(db.Model):

    __tablename__ = 'dm_messages'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(2000), nullable=False)
    senderId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    dm_server_Id = db.Column(db.Integer, db.ForeignKey('dmchannels.id'),nullable=False)
    username = db.Column(db.String, nullable=False)
    imageUrl = db.Column(db.String(200), nullable=True)
    createdAt = db.Column(db.DateTime(timezone=True), server_default=func.now())


    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'senderId': self.senderId,
            'dm_server_Id': self.dm_server_Id,
            'username': self.username,
            'imageUrl': self.imageUrl,
            'createdAt': self.createdAt.strftime("%Y/%m/%d %H:%M:%S")
        }
