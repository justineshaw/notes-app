
import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import axios from "axios";
import BoomtownHeader from "../../components/BoomtownHeader/BoomtownHeader";

import "./SingleNote.css";

function SingleNote({ match }) {
  const [apiResponse, setApiResponse] = useState([]);
  const alert = useAlert();

  // GET /:id
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
        setApiResponse("Error: Note Unavailable");
        if (error.message === "Network Error"){
          alert.show("Server Is Not Connected", { type: "error" });
          setApiResponse("Error: Server Is Not Connected");
        } 
        else if (error.response.status === 422) {
          setApiResponse("Error: The ID you requested is not a Note");
          alert.show("The ID you requested is not a Note", {
            type: "error"
          });
        } else {
          alert.show("Could not access DB", { type: "error" });
        }
      });
  };

  useEffect(() => {
    getMessageFromDB(match);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  return (
    <div>
      <BoomtownHeader />
      <h3>Note at Index {match.params.id}</h3>
      <p>{apiResponse}</p>
    </div>
  );
}

export default SingleNote;
