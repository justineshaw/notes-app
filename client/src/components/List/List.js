import React from 'react';
import PropTypes from 'prop-types';

import './List.css';

const List = props => {

    // Toggle View & Edit Mode For Each Note
    const editNoteToggle = id => {
        let className = document.getElementsByName(id)[0].className;
        if (className === "editMode") {
            document.getElementsByName(id)[0].className = "notEditMode";     
        }
        else {
            document.getElementsByName(id)[0].className = "editMode";
        }
    }

    const saveNote = id => {
        let newMessage = document.getElementsByName(id)[0].getElementsByTagName("textarea")[0].value;
        props.updateDb(id, newMessage);
        editNoteToggle(id);
    }
    
    // Map notes to table rows
    const noteItems = props.items.map(obj => (
      <tr className="notEditMode" key={obj.id} name={obj.id}>
        <th className="messageCell">
          <span>{obj.message}</span>
          <textarea defaultValue=""></textarea>
        </th>
        <th>
          <div className="editNote">
            <button onClick={() => editNoteToggle(obj.id)}>EDIT</button>
          </div>

          <div className="saveNote">
            <button onClick={() => saveNote(obj.id)}>SAVE</button>
            <div>
              <small onClick={() => editNoteToggle(obj.id)}>Cancel</small>
            </div>
          </div>
        </th>
      </tr>
    ));

    return (
        <div>
            <table id="notesTable">
                <tbody>
                    {noteItems}
                </tbody>

            </table>
        </div>

    )
}

// Validate prop types passed to List
List.propTypes = {
    updateDB: PropTypes.func,
    items: PropTypes.array,
};

export default List;