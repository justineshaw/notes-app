import React, { useState, useEffect} from 'react';
import axios from 'axios';
import List from './List';

const App = () => {
  const [apiResponse, setApiResponse] = useState([]);
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [idToUpdate, setIdToUpdate] = useState(0);

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
      id: 1,
      message: message,
    });
  }

  const updateDB = (idToUpdate, newMessage) => {
    axios.put('http://localhost:9000/api', {
      id: idToUpdate,
      message: newMessage,
    });
  }
  
  return (
    <div className="App">
      {<List items={apiResponse} />}
      
      <div style={{ padding: '10px' }}>
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

      <div style={{ padding: '10px' }}>
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

export default App;
