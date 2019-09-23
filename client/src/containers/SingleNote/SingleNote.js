
import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import axios from "axios";

import "./SingleNote.css";

function SingleNote({ match }) {
  const [apiResponse, setApiResponse] = useState([]);
  const alert = useAlert();

  const getMessageFromDB = match => {
    axios
      .get("http://localhost:9000/api/" + parseInt(match.params.id), {
        id: match
      })
      .then(response => {
        if (response.status === 200) {
          alert.show("Success!", { type: "success" });
          setApiResponse(response.data.message.message);
        }
      })
      .catch(error => {
        alert.show("Could not access DB", { type: "error" });
        setApiResponse(error.response.data.errors[0].msg);
      });
  };

  useEffect(() => {
    getMessageFromDB(match);
  }, []);

  

  return (
    <div>
      <h1>Note at Index {match.params.id}</h1>
      <p>{apiResponse}</p>
    </div>
  );
}

export default SingleNote;
