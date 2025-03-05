package br.com.rpgnetic.rpgnexus.auth.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import br.com.rpgnetic.rpgnexus.auth.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    UserDetails findByUsername(String username);    
    User findByEmail(String email);
}
