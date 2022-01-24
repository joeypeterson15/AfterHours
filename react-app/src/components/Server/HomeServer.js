import React from 'react'
import { useState, useEffect} from 'react';
import Search from './Search'
import './HomeServer.css'
import DMFeed from '../MainFeed/DMFeed';
import { fetchDms } from '../../store/dmMessages';
import { useSelector, useDispatch } from 'react-redux';
import { removeDmUser } from '../../store/dmMessages';
import { getDmChannels } from '../../store/dmChannel';
const HomeServer = () => {

  const [showModal, setShowModal] = useState(false);
  const [dmUsers, setDmUsers] = useState([]);
  const [showClose, setShowClose] = useState(false)
  const [current, setCurrent] = useState()
  const [dmUser, setDmUser] = useState(null)

  const user = useSelector(state => state.session.user)

  const dispatch = useDispatch()

  const dmChannels = useSelector(state => Object.values(state.dmChannels))
  console.log('dmChannels', dmChannels)



  useEffect(() => {
    if (!showModal) return;
    const closeModal = () => {
      setShowModal(false);
    };
    document.addEventListener('click', closeModal);
    return () => document.removeEventListener("click", closeModal);
  }, [showModal]);



  const handleClick = () => {
    setShowModal(true)
  }


  useEffect(() => {
    dispatch(getDmChannels(user?.id))
    dispatch(fetchDms(user?.id))
  }, [])




  const handleRemove = (dmuser, user) => {

      dispatch(removeDmUser(dmuser?.id, user?.id))

  }




  return (
    <>
    <div className='dm-wrapper'>
      <span className='start-conversation'>
        <p id="search-users" onClick={handleClick}>Start a conversation</p>
      </span>
      <div className='dm-container'>
        <h3>Direct Messages</h3>

        {/* {dmUsers?.map( (user, i) =>

         <div className='dm-icon'
         onClick={()=> setDmUser(user)}
         onMouseEnter={()=> {setShowClose(true); setCurrent(i)}} onMouseLeave={() => {setShowClose(false); setCurrent(i)}}>
          <img src={user.avatar} className='dm-links'></img>
          {user.online ?  <span className='is-online'><i class="fas fa-circle"></i></span> : <span className='is-offline'><i class="fas fa-circle"></i></span>}
          <p style={{color: showClose && i == current ? 'white' : '#a2a3a6'}}>{user.username}</p>
            {showClose && current == i &&
            <span className="close-dm" style={{color: "rgb(187, 185, 185)"}} onClick={() =>  handleRemove(user)}><i class="fas fa-times"></i></span>}
         </div>

        )

        } */}

        {dmChannels.map(dmChannel =>
            <div onClick={() => setDmUser(dmChannel)}>{dmChannel?.friendName}</div>
          )}
      </div>

      <div className='search-wrapper' >
          { showModal && <Search dmUsers={dmUsers} setDmUser={setDmUser} setShowModal={setShowModal}/>}
      </div>
    </div>
      {dmUser ? <DMFeed dmuser={dmUser} /> : <img className='wumbus' src='https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5e6ff2eb37d0440006bc9fe7%2FDiscord%2F960x0.jpg%3Ffit%3Dscale'></img>}

    </>
  )
}

export default HomeServer
