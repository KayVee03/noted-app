package com.kayvee.noted.controller;

import com.kayvee.noted.model.Note;
import com.kayvee.noted.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    @PostMapping
    public ResponseEntity<Note> create(@RequestBody Note note, Principal principal) {
        return ResponseEntity.ok(noteService.createNote(note, principal));
    }

    @GetMapping
    public ResponseEntity<List<Note>> getAll(Principal principal) {
        return ResponseEntity.ok(noteService.getUserNotes(principal));
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Note>> getByRange(@RequestParam String range, Principal principal) {
        return ResponseEntity.ok(noteService.getNotesByRange(range, principal));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> update(@PathVariable Long id, @RequestBody Note note, Principal principal) {
        return ResponseEntity.ok(noteService.updateNote(id, note, principal));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, Principal principal) {
        noteService.deleteNote(id, principal);
        return ResponseEntity.ok().build();
    }
}
