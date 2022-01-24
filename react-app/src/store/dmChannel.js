const LOAD = 'dmchannels/LOAD'
const ADD = 'dmchannels/ADD'
const DELETE = 'dmchannels/DELETE'


const loadChannels = channels => ({
    type: LOAD,
    channels
})

const addChannel = channel => ({
    type: ADD,
    channel
})

const removeOneChannel = channelId => ({
    type: DELETE,
    channelId
})

export const getDmChannels = (userId) => async dispatch => {
    const response = await fetch(`/api/dmchannels/${userId}`)

    if (response.ok) {
        const channels = await response.json()
        dispatch(loadChannels(channels))
    }
}

export const createOneDmChannel = (payload) => async dispatch => {
    const response = await fetch(`/api/dmchannels/`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({...payload})
    })

    if (response.ok) {

        const channel = await response.json()
        dispatch(addChannel(channel))
    }
}

export const deleteOneDmChannel = (userId, friendId, channelId) => async dispatch => {
    const response = await fetch(`/api/dmchannels/delete/${channelId}`, {
        method: 'DELETE',
        // headers: {
        //   'Content-Type' : 'application/json',
        // },

      })
      if (response.ok) {
          const channelId = await response.json()
          dispatch(removeOneChannel(channelId))
      }

}

const initialState = {
    // list: []
}

const channelDmReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const allChannels = {};


                action.channels.channels.forEach(channel => {
                    allChannels[channel.id] = channel
                });

            return {
                ...allChannels,
                // ...state,
            }
        }

        case ADD: {
            const newState = {
                ...state,
                [action.channel.channel.id]: action.channel.channel
            }
            return newState;
        }

        case DELETE: {
            const newState = {...state}
            delete newState[action.channelId.channelId]
            return newState;
        }

        default:
            return state;
        }
    }

export default channelDmReducer
