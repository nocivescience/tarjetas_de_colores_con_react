import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function NoteList() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const getClass=()=>{
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
    return typeClass[Math.floor(Math.random()*typeClass.length)];
  }
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
    <div className="container"
        style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
        }}
    >
      {notes.map((note,i) => (
        <div key={i} 
        className={getClass()} 
        style={{
            maxWidth: "18rem",
            width:'200px',
            margin:'10px',
            height:'140px',
        }}>
          <div className="card-header">{note.title}</div>
          <div className="card-body">
            <p className="card-text">
              {note.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
