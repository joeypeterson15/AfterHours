from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField

class addDmChannelForm(FlaskForm):
    userId = IntegerField('userId')
    friendId = IntegerField('friendId')
    friendName = StringField('friendName')
    friendAvatar = StringField('friendAvatar')
    
