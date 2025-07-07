import { useEffect, useState } from "react";
import {
  fetchNotes,
  createNote,
  fetchNotesByRange,
  updateNote,
  deleteNote,
} from "../services/api";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes()
      .then(setNotes)
      .catch((err) => {
        console.error(err);
        setError("Failed to load notes. Please login again.");
      });
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const newNote = await createNote(form);
      setNotes([newNote, ...notes]);
      setForm({ title: "", content: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to create note");
    }
  };

  const handleFilterChange = async (e) => {
    const range = e.target.value;
    if (!range) return;
    try {
      const filtered = await fetchNotesByRange(range);
      setNotes(filtered);
    } catch (err) {
      console.error(err);
      setError("Failed to filter notes");
    }
  };

  const startEditing = (note) => {
    setEditingNoteId(note.id);
    setEditForm({ title: note.title, content: note.content });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateNote(editingNoteId, editForm);
      setNotes(notes.map((n) => (n.id === editingNoteId ? updated : n)));
      setEditingNoteId(null);
    } catch (err) {
      console.error(err);
      setError("Failed to update note");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete note");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Notes</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {error && <div className="text-red-500">{error}</div>}
      {notes.length === 0 && !error && <p>No notes found.</p>}

      <form onSubmit={handleCreate} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Content"
          className="w-full border p-2 h-24"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Note
        </button>
      </form>

      <div className="mb-4">
        <label className="mr-2 font-medium">Filter By:</label>
        <select onChange={handleFilterChange} className="border p-1">
          <option value="">--All Time--</option>
          <option value="day">--Last 24 hours--</option>
          <option value="month">--Last month--</option>
          <option value="year">--Last year--</option>
        </select>
      </div>

      <div className="grid gap-4">
        {notes.map((note) => (
          <div key={note.id} className="border p-4 rounded shadow">
            {editingNoteId === note.id ? (
              <form onSubmit={handleUpdate} className="space-y-2">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  className="w-full border p-2"
                />
                <textarea
                  value={editForm.content}
                  onChange={(e) =>
                    setEditForm({ ...editForm, content: e.target.value })
                  }
                  className="w-full border p-2 h-24"
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingNoteId(null)}
                  className="ml-2 text-gray-600"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <h2 className="font-semibold text-lg">{note.title}</h2>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">
                  {note.content}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Created: {note.createdAt?.slice(0, 10)}
                </p>
                <button
                  onClick={() => startEditing(note)}
                  className="text-blue-500 hover:underline text-sm mt-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="text-red-500 hover:underline text-sm mt-1 ml-4"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
