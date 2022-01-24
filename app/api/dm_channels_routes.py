from flask import Blueprint, jsonify, request
from app.models import DMChannel, User, db, Message
from app.forms import addDmChannelForm

dm_channels_routes = Blueprint('dmchannels', __name__)


@dm_channels_routes.route('/<int:id>')
def get_my_channels(id):
    channels = DMChannel.query.filter(DMChannel.userId == id).all()
    return {'channels': [channel.to_dict() for channel in channels]}


@dm_channels_routes.route('/', methods=['POST'])
def create_channel():
    form = addDmChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel1 = DMChannel (
            userId = form.data['userId'],
            friendId = form.data['friendId'],
            # friendAvatar = form.data['friendAvatar'],
            # friendUsername = form.data['friendUsername'],
        )
        channel2 = DMChannel (
            userId = form.data['friendId'],
            friendId = form.data['userId'],
            # friendAvatar = form.data['userAvatar'],
            # friendUsername = form.data['username'],
        )
    db.session.add(channel1)
    db.session.add(channel2)
    db.session.commit()
    return {'channel' : channel1.to_dict()}

@dm_channels_routes.route('/delete/<int:channelId>', methods=['DELETE'])
def delete_channel(channelId):
    channel = DMChannel.query.get(channelId)
    messages = Message.query.filter(Message.channelId == channelId).all()
    print('messages!!!!!!', messages)
    [db.session.delete(message) for message in messages]
    db.session.commit()
    db.session.delete(channel)
    db.session.commit()
    return {'channelId' : channelId}
