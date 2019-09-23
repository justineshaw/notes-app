
import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import axios from "axios";
import List from "../../components/List/List";

import "./NoteBuilder.css";

const NoteBuilder = () => {
  const [apiResponse, setApiResponse] = useState([]);
  const [message, setMessage] = useState("");
  const alert = useAlert();

  useEffect(() => {
    getFromDB();
  }, []);

  const getFromDB = () => {
    axios
      .get("http://localhost:9000/api", {})
      .then(response => {
        setApiResponse(response.data);
      })
      .catch(error => {
        alert.show("Could not access DB", { type: "error" });
      });
  };

  const postToDB = message => {
    axios
      .post("http://localhost:9000/api", {
        message: message
      })
      .then(response => {
        if (response.status === 200) {
          alert.show("New Note Added!", { type: "success" });
          getFromDB();
        }
      })
      .catch(error => {
        alert.show("Could not access DB", { type: "error" });
      });
  };

  const updateDB = (idToUpdate, newMessage) => {
    axios
      .put("http://localhost:9000/api", {
        id: idToUpdate,
        message: newMessage
      })
      .then(response => {
        if (response.status === 200) {
          alert.show("Note Updated!", { type: "success" });
          getFromDB();
        }
      })
      .catch(error => {
        alert.show("Could not access DB", { type: "error" });
      });
  };

  return (
    <div>
      <div className="setMessageBar">
        <input
          type="text"
          onChange={e => setMessage(e.target.value)}
          placeholder="add a note"
          style={{ width: "200px" }}
        />
        <button onClick={() => postToDB(message)}>ADD</button>
      </div>

      <List
        items={apiResponse}
        updateDb={(idToUpdate, newMessage) => updateDB(idToUpdate, newMessage)}
      />
    </div>
  );
};

export default NoteBuilder;