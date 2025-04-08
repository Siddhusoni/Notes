import React, { useState, useEffect } from "react";
import Note from "./components/Note";

export default function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("stickyNotes");
    return saved ? JSON.parse(saved) : [];
  });

  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    localStorage.setItem("stickyNotes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (noteText.trim()) {
      setNotes([...notes, { id: Date.now().toString(), text: noteText }]);
      setNoteText("");
    }
  };

  const handleEdit = (id, newText) => {
    setNotes(notes.map(note => note.id === id ? { ...note, text: newText } : note));
  };

  const handleDelete = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://i.pinimg.com/originals/c4/05/e5/c405e59f2114f36defe07f92a771d9a5.gif')" }}
    >
      <div className="flex items-center justify-center mb-6 gap-3">
  <img
    src="https://www.iconarchive.com/download/i18743/iconshock/real-vista-project-managment/task-notes.ico"
    alt="Sticky Note Icon"
    className="w-10 h-10"
  />
  <h1 className="text-3xl font-bold text-white drop-shadow-lg">
    Sticky Notes App
  </h1>
</div>


      <div className="flex justify-center gap-3 mb-6">
        <input
          type="text"
          className="border rounded p-2 w-72 bg-white"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write a note..."
        />
        <button
          onClick={handleAddNote}
          className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded font-semibold"
        >
          Add Note
        </button>
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        {notes.map(note => (
          <Note
            key={note.id}
            id={note.id}
            text={note.text}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
