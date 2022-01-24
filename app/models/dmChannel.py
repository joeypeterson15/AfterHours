from .db import db

class DMChannel(db.Model):

    __tablename__ = 'dmchannels'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    friendId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def to_dict(self):

        return {
            'id': self.id,
            'userId': self.userId,
            'friendId': self.friendId
        }
