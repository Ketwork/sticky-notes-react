import React, {useState} from 'react';

export function App() {
    const [noteInput, setNoteInput] = useState('');
    const addNote = () => {};

    return (
        <div className="app">
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

            { noteInput }
        </div>
    );
}