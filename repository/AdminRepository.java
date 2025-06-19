package com.biz.hive.repository;

import com.biz.hive.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    // Find admin by email (for login)
    Optional<Admin> findByEmail(String email);

    // Check if email already exists
    boolean existsByEmail(String email);

    Optional<Admin> findByEmailAndPassword(String email, String password);

}

