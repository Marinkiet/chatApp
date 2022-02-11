import React from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from './SidebarChat';
import db from './firebase';
import './Sidebar.css';
import { useEffect, useState } from 'react';


function Sidebar() {

  const [Rooms, setRooms] = useState([]);
  useEffect(() => {
    db.collection("Rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
        }))
      )
    );
  }, []);

  return (
    <div className='sidebar'>

      <div className='sidebar_header'>
        <Avatar />
        <div className="sidebar_headerRight">

          <IconButton>
            <DonutLargeIcon />
          </IconButton>

          <IconButton>
            <ChatIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>

        </div>
      </div>
      <div className='sidebar_search'>

        <div className="sidebar_SearchContainer">
          <SearchOutlined />
          <input type="text" placeholder='Search or start new chat' />
        </div>


      </div>
      <div className='sidebar_chats'>
        <SidebarChat addNewChat />
        {Rooms.map(room => (
          <SidebarChat
            key={room.id}
            id={room.id}
            name={room.data.name} />))}

      </div>
    </div>
  )
}

export default Sidebar;


