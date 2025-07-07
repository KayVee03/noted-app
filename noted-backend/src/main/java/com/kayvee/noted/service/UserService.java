package com.kayvee.noted.service;

import com.kayvee.noted.dto.LoginRequest;
import com.kayvee.noted.dto.RegisterRequest;
import com.kayvee.noted.model.User;
import com.kayvee.noted.repository.UserRepository;
import com.kayvee.noted.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtUtil jwtUtil;
	
	public String register(RegisterRequest request) {
	    if (userRepository.findByUsername(request.getUsername()).isPresent()) {
	        throw new RuntimeException("Username already exists");
	    }

	    User user = User.builder()
	            .username(request.getUsername())
	            .password(passwordEncoder.encode(request.getPassword()))
	            .build();
	    userRepository.save(user);
	    return jwtUtil.generateToken(user.getUsername());
	}
	
	public String login(LoginRequest request) {
		User user = userRepository.findByUsername(request.getUsername())
				.orElseThrow(()-> new RuntimeException("User not found"));
		
		if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
			throw new RuntimeException("Invalid Credentials");
		}
		return jwtUtil.generateToken(user.getUsername());
	}
}
