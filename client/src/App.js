import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';

import NoteBuilder from "./containers/NoteBuilder/NoteBuilder";
import SingleNote from "./containers/SingleNote/SingleNote";

function App() {
  return (
    <Router>
      <div>
        <Route path="/:id" exact component={SingleNote} />
        <Route path="/" exact component={NoteBuilder} />
      </div>
    </Router>
  );
}

export default App;