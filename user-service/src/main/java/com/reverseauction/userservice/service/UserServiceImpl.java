package com.reverseauction.userservice.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.reverseauction.userservice.dto.UserDto;
import com.reverseauction.userservice.entity.User;
import com.reverseauction.userservice.exception.UserNotFoundException;
import com.reverseauction.userservice.repository.UserRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    UserRepository userRepository;
    // private final KafkaTemplate<String, UserPlacedEvent> kafkaTemplate;

    @Override
    public User getUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (!user.isPresent()) {
            throw new UserNotFoundException(id);
        }

        return unwrapUser(user, id);
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<UserDto> getUsers(int pageNo, int pageSize) {
        PageRequest pageable = PageRequest.of(pageNo, pageSize);
        Page<User> products = userRepository.findAll(pageable);
        List<User> listOfUsers = products.getContent();

        return listOfUsers.stream().map(p -> mapToDto(p)).collect(Collectors.toList());
    }


    // @Override
    // public User updateUser(Double amount, Long id, Long userId, Long productId) {
    // Optional<User> user = userRepository.findByUserIdAndproductId(userId,
    // productId);
    // User unwrappedGrade = unwrapUser(user, id);
    // unwrappedGrade.setPrice(amount);
    // return userRepository.save(unwrappedGrade);
    // }

    static User unwrapUser(Optional<User> entity, Long id) {
        if (entity.isPresent())
            return entity.get();
        else
            throw new UserNotFoundException(id);
    }

    private UserDto mapToDto(User user) {
        if (user == null) {
            return null;
        }
        UserDto userDTO = new UserDto();
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setName(user.getName());
        userDTO.setCreatedAt(user.getCreatedAt());
        userDTO.setUpdatedAt(user.getUpdatedAt());
        return userDTO;
    }

}
