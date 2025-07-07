const API_BASE = "http://localhost:8080/api";
import { getToken } from "../utils/auth";

export async function fetchNotes() {
  const res = await fetch(`${API_BASE}/notes`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch notes");
  return await res.json(); // list of notes
}

export async function createNote(note) {
  const res = await fetch(`${API_BASE}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return await res.json();
}

export async function fetchNotesByRange(range) {
  const res = await fetch(`${API_BASE}/notes/filter?range=${range}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch filtered notes");
  return await res.json();
}

export async function updateNote(id, note) {
  const res = await fetch(`${API_BASE}/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to update note");
  return await res.json();
}

export async function deleteNote(id) {
  const res = await fetch(`http://localhost:8080/api/notes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete note");
}

export async function loginUser(credentials) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error("Login failed");
  return await res.json();
}

export async function registerUser(credentials) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error("Registration failed");
  return await res.json();
}
