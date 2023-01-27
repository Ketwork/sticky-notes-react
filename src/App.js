import React, {useState, useReducer} from 'react';
import { v4 as uuid } from 'uuid'; // function to provide unique identifier

const initialNotesState = {
  lastNoteCreated: null,
  totalNotes: 0,
  notes: [],
};

const notesReducer = (prevState, action) => {
  switch (action.type) {
    case 'ADD_NOTE': {
      const newState = { 
        notes: [...prevState.notes, action.payload],
        totalNotes: prevState.notes.length + 1,
        lastNoteCreated: new Date().toTimeString().slice(0, 8),
      };
      console.log('After ADD_NOTE: ', newState);
        return newState;
    }

    case 'DELETE_NOTE': {
      const newState = {
          ...prevState,
          notes: prevState.notes.filter(note => note.id !== action.payload.id),
          totalNotes: prevState.notes.length -1,
      }
    }
  }
}

export function App() {
    const [noteInput, setNoteInput] = useState('');
    const [nostesState, dispatch] = useReducer(notesReducer, initialNotesState)
    
    const addNote = event => {
      event.preventDefault();

      if(!noteInput) {
        return
      }

      const newNote = {
        id: uuid(),
        text: noteInput, 
        rotate: Math.floor(Math.random() * 20)
      }

      dispatch({ type: 'ADD_NOTE', payload: newNote }); //sends to redux store (gets passed to the action argument in notesReducer)
      setNoteInput(''); // clear form after adding new note
    };

    const dropNote = () => {
        event.target.style.left = `${event.pageX - 50}px`;
        event.target.style.top = `${event.pageY - 50}px`;
    }

    const dragOver = event => {
        event.stopPropagation();
        event.preventDefault();
    }

    return (
        <div className="app" onDragOver={dragOver}> 
            <h1>
                Sticky Notes
            </h1>
            <form onSubmit={addNote} className="note-form">
              <textarea value={noteInput}
                onChange={event => setNoteInput(event.target.value)}
                placeholder="Create a new note...">
              </textarea>
              <button>Add</button>
            </form>

            {nostesState
              .notes
              .map(note => (
                <div onClick={() => dispatch ({type: 'DELETE_NOTE', payload: note })} 
                className='note'
                style={{ transform: `rotate(${note.rotate}deg)` }}
                draggable="true"
                onDragEnd={dropNote}
                key={note.id}
                >
                  <div className='close'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>

                  </div>

                  <pre className='text'>{note.text}</pre>
                </div>
              ))
            }

        </div>
    );
}