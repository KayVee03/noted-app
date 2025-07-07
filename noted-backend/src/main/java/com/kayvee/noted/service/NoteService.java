package com.kayvee.noted.service;

import com.kayvee.noted.model.Note;
import com.kayvee.noted.model.User;
import com.kayvee.noted.repository.NoteRepository;
import com.kayvee.noted.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteService {
	private final NoteRepository noteRepository;
    private final UserRepository userRepository;
    
    private User getCurrentUser(Principal principal) {
    	return userRepository.findByUsername(principal.getName())
    			.orElseThrow(()-> new RuntimeException("User not found"));
    			
    }
    public Note createNote(Note note, Principal principal) {
    	User user = getCurrentUser(principal);
    	note.setUser(user);
    	return noteRepository.save(note);
    }
    public List<Note> getUserNotes(Principal principal){
    	return noteRepository.findByUser(getCurrentUser(principal));
    }
    
    public List<Note> getNotesByRange(String range, Principal principal){
    	User user = getCurrentUser(principal);
    	LocalDateTime since = switch(range.toLowerCase()) {
    	case "day" -> LocalDateTime.now().minusDays(1);
    	case "month" -> LocalDateTime.now().minusMonths(1);
        case "year" -> LocalDateTime.now().minusYears(1);
        default -> LocalDateTime.MIN;
    	};
    	return noteRepository.findByUserAndCreatedAtAfter(user, since);
    }
    
    public void deleteNote(Long id, Principal principal) {
    	Note note = noteRepository.findById(id)
    			.orElseThrow(()-> new RuntimeException("note not found"));
    	if(!note.getUser().getUsername().equals(principal.getName())) {
    		throw new RuntimeException("Unauthorized");
    	}
    	noteRepository.delete(note);
    }
    public Note updateNote(Long id, Note updated, Principal principal) {
    	Note existing = noteRepository.findById(id)
    			.orElseThrow(()-> new RuntimeException("Note not found"));
    	
    	if (!existing.getUser().getUsername().equals(principal.getName())) {
            throw new RuntimeException("Unauthorized");
        }
    	existing.setTitle(updated.getTitle());
    	existing.setContent(updated.getContent());
    	return noteRepository.save(existing);
    }
}
