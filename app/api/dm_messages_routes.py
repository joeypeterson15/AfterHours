from flask import Blueprint, jsonify, session, request, redirect
from sqlalchemy import or_
from app.models import  DMMessage, User, db
from app.forms import  DmMessageForm

dm_messages_routes = Blueprint('dms', __name__)

@dm_messages_routes.route('/<int:dmChannelId>', methods=["GET"])
def get_dms(dmChannelId):
  dms = DMMessage.query.filter(DMMessage.dm_server_Id == dmChannelId).all()
  print( [dm.to_dict() for dm in dms])
  return {'messages': [dm.to_dict() for dm in dms]}

@dm_messages_routes.route('/new', methods=['POST'])
def send_dm():
  form = DmMessageForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    message = DMMessage(
            body = form.data['body'],
            senderId = form.data['senderId'],
            dm_server_Id = form.data['dm_server_Id'],
            username = form.data['username'],
            imageUrl = form.data['imageUrl']

        )
  db.session.add(message)
  db.session.commit()
  return message.to_dict()
