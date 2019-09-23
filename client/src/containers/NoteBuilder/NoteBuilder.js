
import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import axios from "axios";
import List from "../../components/List/List";
import BoomtownHeader from "../../components/BoomtownHeader/BoomtownHeader";
import AddNote from "../../components/AddNote/AddNote";

import "./NoteBuilder.css";

const NoteBuilder = () => {
  const [apiResponse, setApiResponse] = useState([]);
  const [message, setMessage] = useState("");
  const alert = useAlert();

  useEffect(() => {
    getFromDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // GET
  const getFromDB = () => {
    axios
      .get("http://localhost:9000/api", {})
      .then(response => {
        setApiResponse(response.data);
      })
      .catch(error => {
        if (error.message === "Network Error") {
          alert.show("Server Is Not Connected", { type: "error" });
        }
        else {
          alert.show("Could not access DB", { type: "error" });
        }
      });
  };

  // POST
  const postToDB = () => {
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
        if (error.message === "Network Error") {
          alert.show("Server Is Not Connected", { type: "error" });
        } else if (error.response.status === 422) {
            alert.show("Please Enter A Non-Empty Note", { type: "error" });
        } else {
          alert.show("Could not access DB", { type: "error" });
        }
      });
  };

  // PUT
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
        if (error.message === "Network Error") {
          alert.show("Server Is Not Connected", { type: "error" });
        } else if (error.response.status === 422) {
          alert.show("Please Enter A Non-Empty Note", { type: "error" });
        } else {
          alert.show("Could not access DB", { type: "error" });
        }
      });
  };

  return (
    <div>
      <BoomtownHeader />
      <AddNote 
        setMessage={setMessage} 
        postToDB={() => postToDB()} 
      />
      <List
        items={apiResponse}
        updateDb={(idToUpdate, newMessage) => updateDB(idToUpdate, newMessage)}
      />
    </div>
  );
};

export default NoteBuilder;