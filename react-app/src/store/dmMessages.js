const ADD_ONE_DM = 'dms/ADD_ONE_DM'
const LOAD_ALL = '/dms/LOAD'
const DELETE = 'dms/DELETE'

const addDm = (message) => ({
  type: ADD_ONE_DM,
  message
})

const loadDms = (messages) => ({
  type: LOAD_ALL,
  messages,
})

const deleteDmUser = (senderId) => ({
  type: DELETE,
  senderId
})

export const fetchDms = (dmChannelId) => async dispatch => {
  const res = await fetch(`/api/dms/${dmChannelId}`)
  if (res.ok){
    const messages = await res.json()
    dispatch(loadDms(messages))
  }
}

export const createDm = (payload) => async dispatch => {
  const response = await fetch('/api/dms/new', {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/json',
    },
    body: JSON.stringify({...payload})
  })
  if (response.ok) {
    const message = await response.json()
    dispatch(addDm(message))
  }

}

export const removeDmUser = (dmuser, user) => async dispatch => {
  const response  = await fetch(`/api/dms/remove/${dmuser?.id}/${user?.id}`, {
    method: 'DELETE',
    headers: {'Content-Type' : 'application/json'}
  })

  if (response.ok) {
    const senderId = await response.json()
    // const senderId = dmuser?.id
    dispatch(deleteDmUser(senderId))
  }
}


const initialState = {}
const dmMessagesReducer = (state = initialState, action) => {
    switch(action.type) {
      case(LOAD_ALL): {
        let allMessages = {};

            // allMessages = {...action.messages.messages}
            action.messages.messages.forEach(message => {
              allMessages[message.id] = message
          });

        return {
            ...allMessages,
            // ...state,
        }
    }

      case(ADD_ONE_DM): {
          const newState = {
            ...state,
        }
        return newState
      }

        default:
        return state;
    }
}

export default dmMessagesReducer
