import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ReadNotes from './components/ReadNotes';
import CreateNewNote from './components/CreateNewNote';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './components/DashBoard'
import UpdateNote from './components/UpdateNote';
import DeleteNote from './components/DeleteNotes';
import './style/ReadNotes.css'

function App() {
  const [notes, setNotes] = useState([]);
  const [showStatus, setShowStatus] = useState('all');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteImportant, setNewNoteImportant] = useState('true');
  const newNoteContentRef = useRef(null);

  useEffect(() => {
    fetchNotes();
  }, [])

  const fetchNotes = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      // console.log(response)
      // console.log(response.data)
      setNotes(response.data)
    } catch (error) {
      console.log('error fetching data', error)
    }
  }

  const addNote = (event) => {
    event.preventDefault();
    let noteObject = {
      id: notes.length + 1,
      content: newNoteContent,
      important: newNoteImportant == 'true',
    }
    console.log('adding new note...')
    axios
      .post('https://jsonplaceholder.typicode.com/users', noteObject)
      .then(response => {
        console.log('note added successfully...')
      })

    fetchNotes()
    setNewNoteContent('');
    setNewNoteImportant('');
    newNoteContentRef.current.focus();
  }

  const handleStatusChange = (event) => {
    setShowStatus(event.target.value);
  }

  const padd = {
    padding: 10
  }

  return (
    <Router>
      <div>
        <Link to='/' style={padd}>DashBoard</Link>
        <Link to='/read' style={padd}>Read Notes</Link>
        <Link to='/create' style={padd}>Create Notes</Link>
        <Link to='/update' style={padd}>Update Notes</Link>
        <Link to='/delete' style={padd}>Delete Note</Link>
      </div>

      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/read'
          element={<ReadNotes showStatus={showStatus}
            handleStatusChange={handleStatusChange}
            notes={notes} />} />
        <Route path='/create'
          element={<CreateNewNote addNote={addNote}
            newNoteContent={newNoteContent}
            newNoteImportant={newNoteImportant}
            newNoteContentRef={newNoteContentRef}
            setNewNoteContent={setNewNoteContent}
            setNewNoteImportant={setNewNoteImportant} />} />

        <Route path='/update'
          element={<UpdateNote notes={notes}
            setNotes={setNotes}
            fetchNotes={fetchNotes} />} />

        <Route path='/delete' element={<DeleteNote
          notes={notes}
          setNotes={setNotes}
          fetchNotes={fetchNotes} />} />
      </Routes>
    </Router>
  )
}

export default App;
