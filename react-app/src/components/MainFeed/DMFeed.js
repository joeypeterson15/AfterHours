import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './DmFeed.css'


import { io } from 'socket.io-client';
let socket;

const DMFeed = ({dmuser}) => {

const dispatch = useDispatch()




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


  return (
    null

    // <div className='dm-feed-container'>

    //   <div className='dm-message-container'>
    //   <div className="dm-history">
    //       < div className='avatar' style={{backgroundImage: `url(${dmuser.avatar})` }} ></div>
    //       <h2>{dmuser.username}</h2>
    //       <h4>This is the beginning of your direct message history with @{dmuser.username}</h4>

    //     </div>
    //     {dms && dms.map(dm =>
    //     <div className='dm-message'>
    //       <div className='live-chat-avatar-div' style={{backgroundImage: `url(${dm?.imageUrl})`}}> </div>
    //       <div className='inner-dm-message'>
    //         <div className='dm-date-time'>
    //         <h3>{dm.username}</h3>
    //         <div className='decorated'>
    //             <span>
    //                 {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(dm?.createdAt))} {new Date(dm?.createdAt).getDate()}, 2021
    //             </span>
    //           </div>
    //         </div>
    //       <div className='dm-body'>{dm.body}</div>
    //       </div>
    //     </div>
    //       )}
    //       <div className="Main-Message-content">

    //       {chatmessages.map((message) => (
    //       <div className="live-chat-div">
    //           <div className='decorated'>
    //           <span>
    //               {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(message[3]))} {new Date(message[3]).getDate()}, 2021
    //           </span>
    //           </div>

    //           <div className="username-message-container">

    //               <div className='live-chat-avatar-div' style={{backgroundImage: `url(${message[2]})`}}></div>
    //               <div>

    //           <div className="date-div"><span className='username-div-message'>{message[1]}</span><span className='time-message'>{isSameDay(message[3]) === true ? "Today at  " : ''}{convertTime(new Date(message[3]).toString())}</span></div>
    //           <div className="channel-content-message">{message[0]}</div>

    //       </div>
    //                   {/* <div className="channel-content-message">
    //                       {`${message[1]}:${message[0]}`}
    //                   </div> */}
    //           </div>

    //       </div>
    //           ))}

    //       </div>
    //   </div>
    //     <div className="channel-content-chat-input-container dm-input">
    //                 <form className="new-dm-form" onSubmit={(e) => handleDm(e)} >
    //                     <label className="new-message-label">
    //                         <textarea
    //                             type="text"
    //                             className="new-message-input"
    //                             value={body}
    //                             onChange={(e)=> setBody(e.target.value)}
    //                             onKeyDown={handleEnter}
    //                             // ref={messageRef}
    //                             placeholder={`Message #${dmuser.username}`}
    //                         ></textarea>

    //                         { messageError &&
    //                             <p className="message-error">{messageError}</p>
    //                         }
    //                     </label>
    //                 </form>
    //             </div>

    // </div>
  )
}

export default DMFeed
