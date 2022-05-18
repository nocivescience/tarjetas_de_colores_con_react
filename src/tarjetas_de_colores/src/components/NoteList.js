import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function NoteList() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const typeClass=[
        'card text-white bg-primary mb-3',
        'card text-white bg-secondary mb-3',
        'card text-white bg-success mb-3',
        'card text-white bg-danger mb-3',
        'card text-dark bg-warning mb-3',
        'card text-dark bg-info mb-3',
        'card text-dark bg-light mb-3',
        'card text-white bg-dark mb-3',
  ]
  const loadNotes = async () => {
    const response = await fetch("http://localhost:3000/api/notes");
    const data = await response.json();
    setNotes(data);
  };
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/notes/delete/${id}`, {
      method: "DELETE",
    });
    setNotes(notes.filter((task) => task.id !== id));
  };
  useEffect(() => {
    loadNotes();
  }, []);
  return (
    <div className="container">
      {notes.map((note,i) => (
        <div key={note.id} className="card text-dark bg-light mb-3" style={{maxWidth: "18rem"}}>
          <div className="card-header">Header</div>
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">
              {note.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
