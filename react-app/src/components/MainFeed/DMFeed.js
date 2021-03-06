import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { useState } from 'react';
import { createDm, fetchDms } from '../../store/dmMessages';
import './DmFeed.css'
import './MainFeed.css'


import { io } from 'socket.io-client';
let socket;

const DMFeed = ({dmuser, setdmuser}) => {

const dispatch = useDispatch()
const [body, setBody] = useState('')
const sessionUser = useSelector(state => state.session?.user)

const dms = useSelector(state => Object.values(state.dms))
console.log('dms', dms)

useEffect(() => {
  dispatch(fetchDms(dmuser?.id))
}, [dmuser])




const convertTime = function(oldTime){
  console.log(oldTime)
  let newTime = oldTime.split(' ')[4]
  let time = newTime.split(':');
  let hours = time[0];
  let minutes = time[1];
  let timeValue = "" + ((hours >12) ? hours -12 :hours);
      timeValue += (minutes < 10) ? ':' + minutes : ":" + minutes;
      timeValue += (hours >= 12) ? " pm" : " am";
      // timeValue += "" + date
      return timeValue;
  }

const isSameDay = function(oldTime) {
  // let today = Date.now().getDate().toString()
  let newToday = new Date().getDate().toString()
  let newOldTime = new Date(oldTime).getDate()
  console.log('todays date:', newToday)
  console.log('message date:', newOldTime)
  if (newToday == newOldTime){
      return true
  }
  return false
}

const handleDm = (e) => {
    e.preventDefault()

    const payload = {
      senderId : sessionUser?.id,
      dm_server_Id : dmuser?.id,
      imageUrl : sessionUser?.avatar,
      username : sessionUser?.username,
      body
    }

    dispatch(createDm(payload))
    setBody('')
    dispatch(fetchDms(dmuser?.id))
}


  return (

    <>

    <div className='dm-feed-container'>

      <div className='dm-message-container'>
        {dms.length === 0 ? <div className="dm-history">
          < div className='avatar' style={{backgroundImage: `url(${dmuser.friendAvatar})` }} ></div>
          <h2>{dmuser.friendName}</h2>
          <h4>This is the beginning of your direct message history with @{dmuser.friendName}</h4>

        </div> : ''}
        {dms && dms.map(dm =>
        <div className='dm-message'>
          <div className='live-chat-avatar-div' style={{backgroundImage: `url(${dm?.imageUrl})`}}> </div>
          <div className='inner-dm-message'>
            <div className='dm-date-time'>
            <h3>{dm?.username}</h3>
            <div className='decorated'>
                <span>
                    {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(dm?.createdAt))} {new Date(dm?.createdAt).getDate()}, 2021
                </span>
              </div>
            </div>
          <div className='dm-body'>{dm.body}</div>
          </div>
        </div>
          )}

      </div>




        <div className="dm-members-div">
            <h2 id="dm-members-title">MEMBER:</h2>

                <div className="dm-div">
                    <div className="user-avatar" style={{backgroundImage: `url(${dmuser?.friendAvatar})`}}></div>
                    <span className="dm-member-name">{dmuser?.friendName}</span>
                </div>

        </div>




          <form className="send-dm-message-form" onSubmit={(e) => handleDm(e)} >

                  <input
                      type="text"
                      className="input-dm-message"
                      value={body}
                      onChange={(e)=> setBody(e.target.value)}
                      placeholder={`Message #${dmuser?.friendName}...`}
                  ></input>
          </form>

    </div>




    </>


  )
}

export default DMFeed
