package com.kayvee.noted.service;

import com.kayvee.noted.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService{
	private final UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username)throws UsernameNotFoundException{
		var user = userRepository.findByUsername(username)
				.orElseThrow(()->new UsernameNotFoundException("User not found"));
		
		return new org.springframework.security.core.userdetails.User(
				user.getUsername(), user.getPassword(), java.util.Collections.emptyList());
	}

}
