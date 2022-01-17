import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ChatRoom from './components/ChatRoom';
import ChatRoomsList from './components/ChatRoomsList';
import { Route, Switch } from 'react-router';
import axios from "axios";
import { useEffect } from "react";
import CreateRoomModal from './components/CreateRoomModal';

function App() {

  const [rooms, setRooms] = useState([])

  useEffect(()=>fetchRooms(),[])

const fetchRooms = async () => {
  try{ 
    const response = await axios.get("https://coded-task-axios-be.herokuapp.com/rooms")
    // console.log(response)
    setRooms(response.data)

  } catch (error) {
    console.log(error);
    alert("Failed in fetching rooms!")
  }

}

  const createRoom = async (newRoom) => {
    try{ 
      const response = await axios.post("https://coded-task-axios-be.herokuapp.com/rooms", newRoom)
  setRooms([...rooms, response.data])
  
    } catch (error) {
      console.log(error);
      alert("Cannot add new room!")
    }
  
  }

  const deleteRoom = async (id) => {

    try{ 
      console.log(id)
      await axios.delete(`https://coded-task-axios-be.herokuapp.com/rooms/${id}`)
  setRooms(rooms.filter((e)=>e.id !== id))
  
    } catch (error) {
      console.log(error);
      alert("Cannot add delete room!")
    }
  
    // to do : call BE to delete a room
  }

  return (
    <div className="__main">
      <div className="main__chatbody">
        <Switch>
          <Route path="/room/:roomSlug">
            <ChatRoom rooms={rooms} />
          </Route>
          <Route exact path="/">
            <center>
              <ChatRoomsList rooms={rooms} deleteRoom={deleteRoom} createRoom = {createRoom} />
            </center>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
