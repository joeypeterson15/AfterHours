import React from 'react'
import { useEffect, useState } from 'react'
import Server from '../Server'
import Channels from '../Channels/Index'
import './dashboard.css'
import { MainFeed } from '../MainFeed'
import ServerMembersFeed from '../ServerMembersFeed'
import NavBar from '../NavBar'
import { useParams } from 'react-router'

const Dashboard = () => {
  // const [showServerMembers, setShowSeverMembers] = useState(true)
  const params = useParams()
  let serverId = params?.serverId


  return (
    <>
    {/* <NavBar /> */}
    <div className="dashboard-container">
      <Server />
      <Channels />
      <MainFeed />
      {serverId == 'explore' ? '' : <div id="black-line"></div>}
      {(serverId == 'explore' ||  window.location.href.includes('home') || window.location.href.includes('dashboard')) ? null  : <ServerMembersFeed />}
      {/* <Members / > */}
      { window.location.href.includes('dashboard') ? <img className='wumbus' src='https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5e6ff2eb37d0440006bc9fe7%2FDiscord%2F960x0.jpg%3Ffit%3Dscale'></img>: ''}
    </div>
    </>
  )
}

export default Dashboard
