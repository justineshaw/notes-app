import React from "react";

import "./AddNote.css";

// Component to Add A Note
const AddNote = (props) => {
  return (
    <div className="setMessageBar">
    <input
        type="text"
        onChange={e => props.setMessage(e.target.value)}
        placeholder="add a note"
        style={{ width: "200px" }}
    />
    <button onClick={() => props.postToDB()}>ADD</button>
    </div>
  );
};

export default AddNote;
