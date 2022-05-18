import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function NoteForm() {
  const [note, setNote] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    if (params.id) {
      loadTask(params.id);
    }
  }, [params.id]);
  const loadTask = async (id) => {
    const res = await fetch(`http://localhost:3000/api/notes/${id}`);
    const data = await res.json();
    setNote({
      title: data.title,
      description: data.description,
    });
    setEditing(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (editing) {
      const response = await fetch(
        `http://localhost:3000/api/notes/edit/${params.id}`,
        {
          method: "PUT",
          body: JSON.stringify(note),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await response.json();
    } else {
      const response = await fetch("http://localhost:3000/api/notes/new-note", {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json"
        },
      });
      await response.json();
    }
    setLoading(false);
    navigate("/");
  };
  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <div className="container m-4">
        <div className="row">
          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <form onSubmit={handleSubmit}>
                  <label htmlFor="title">
                    Título
                  </label>
                  <input
                    className="form-control mt-3 mb-3"
                    value={note.title}
                    name="title"
                    onChange={handleChange}
                  />
                  <label htmlFor="description">
                    Descripción
                  </label>
                  <textarea
                    className="form-control mt-3 mb-3"
                    value={note.description}
                    name="description"
                    onChange={handleChange}
                    rows='5'
                  />
                  <button
                    className="btn btn-primary"
                    type="submit"
                    >Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
