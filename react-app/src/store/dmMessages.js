const LOAD = 'dMmessages/LOAD'
const ADD = 'dMmessages/ADD'




const load = messages => ({
    type: LOAD,
    messages
})

const createDmMessage = message => ({
    type: ADD,
    message
})




export const getDmMessages = (userId, friendId) => async dispatch => {
    const response = await fetch(`/api/messages/${userId}/${friendId}`)
    if (response.ok) {
        const messages = await response.json()

        dispatch(load(messages))
    }
}

export const createOneDmMessage = (payload) => async dispatch => {
    const response = await fetch(`/api/messages/`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({...payload})
      })
    if (response.ok) {
        const message = await response.json()
        dispatch(createDmMessage(message))
    }
}



const initialState = {
    // list: []
}

const dmMessageReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD: {
            const allMessages = {};
            action.messages.messages.forEach(message => {
                allMessages[message.id] = message
            });
            return {
                ...allMessages,
                // ...state,
            }
        }
        case ADD: {
            const newState = {
                ...state,
                [action.message.id]: action.message
            }
            return newState;
        }
        default:
            return state;
        }
    }

export default dmMessageReducer
