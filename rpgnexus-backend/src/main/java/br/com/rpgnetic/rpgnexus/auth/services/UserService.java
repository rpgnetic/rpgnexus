package br.com.rpgnetic.rpgnexus.auth.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.rpgnetic.rpgnexus.auth.entities.User;
import br.com.rpgnetic.rpgnexus.auth.repositories.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User findById(UUID userId) {
        return userRepository.findById(userId).get();
    }
}
