package com.authentication.authentication.service;

import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.authentication.authentication.entity.User;
import com.authentication.authentication.exception.EntityNotFoundException;
import com.authentication.authentication.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
        private UserRepository userRepository;
	private BCryptPasswordEncoder bCryptPasswordEncoder;

    //TODO: Get user based on username

    @Override
    public User getUser(String username) {
        // TODO Auto-generated method stub
        Optional<User> user = userRepository.findByUsername(username);
        return unwrapUser(user,404L);
    }

    @Override
    public User getUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        return unwrapUser(user, id);
    }

    @Override
    public User saveUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    static User unwrapUser(Optional<User> entity, Long id) {
        if (entity.isPresent()) return entity.get();
        else throw new EntityNotFoundException(id, User.class);
    }
}
