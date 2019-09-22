import React, { useState, useEffect} from 'react';
import { useAlert } from 'react-alert'
import axios from 'axios';
import List from './List';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/:id" exact component={Match} />
        <Route path="/" exact component={App} />
      </div>
    </Router>
  );
}

const App = () => {
  const [apiResponse, setApiResponse] = useState([]);
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [idToUpdate, setIdToUpdate] = useState(0);
  const alert = useAlert()

  useEffect(() => {
    getFromDB();
  });

  async function getFromDB() {
    const res = await fetch("http://localhost:9000/api")
    res
      .json()
      .then(res => setApiResponse(res));
  }

  const postToDB = (message) => {
    axios.post('http://localhost:9000/api', {
      message: message,
    })
      .then(response => {
        if (response.status === 200) {
          alert.show("Success!", { type: 'success'});
        }
      })
      .catch(error => {
        alert.show(error.response.data.errors[0].msg, { type: 'error' })
    });
  }

  const updateDB = (idToUpdate, newMessage) => {
    axios.put('http://localhost:9000/api', {
      id: idToUpdate,
      message: newMessage,
    })
      .then(response => {
        if (response.status === 200) {
          alert.show("Success!", { type: 'success' });
        }
      })
  .catch(error => {
    alert.show(error.response.data.errors[0].msg, { type: 'error' })
  });
  }

  const deleteFromDB = (idToDelete) => {
    console.log("delete from DB app.js")
    axios.put('http://localhost:9000/api', {
      id: idToDelete
    });
  }
  
  return (
    <div>
      <div className="setMessageBar">
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          placeholder="add a note"
          style={{ width: '200px' }}
        />
        <button onClick={() => postToDB(message)}>
          ADD
        </button>
      </div>

      <List 
        items={apiResponse} 
        updateDb={(idToUpdate, newMessage) => updateDB(idToUpdate, newMessage)}
        deleteFromDB={(id) => deleteFromDB(id)}
      />

      <div className="updateMessageBar">
        <input
          type="text"
          style={{ width: '200px' }}
          onChange={(e) => setIdToUpdate(e.target.value)}
          placeholder="id of item to update here"
        />
        <input
          type="text"
          style={{ width: '200px' }}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="put new value of the item here"
        />
        <button
          onClick={() => updateDB(idToUpdate, newMessage)
          }
        >
          UPDATE
          </button>
      </div>

    </div>
  );
}

function Match({ match }) {
  const [apiResponse, setApiResponse] = useState([]);
  const alert = useAlert()

  const sillyFunction = match => {
    axios.get("http://localhost:9000/api/" + parseInt(match.params.id), {
      id: match,
    })
      .then(response => {
        if (response.status === 200) {
          alert.show("Success!", { type: 'success' });
          console.log(response.data.message.message);
          setApiResponse(response.data.message.message);
        }
      })
      .catch(error => {
        alert.show(error.response.data.errors[0].msg, { type: 'error' })
        setApiResponse(error.response.data.errors[0].msg);
      });
  }

  sillyFunction(match);

  return (
    <p>{apiResponse}</p>
  )
}

export default AppRouter;
