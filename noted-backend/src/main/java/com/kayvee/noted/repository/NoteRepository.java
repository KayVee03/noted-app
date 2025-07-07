package com.kayvee.noted.repository;

import com.kayvee.noted.model.Note;
import com.kayvee.noted.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long>{
	List<Note> findByUser(User user);
	List<Note> findByUserAndCreatedAtAfter(User user, LocalDateTime date);
}
