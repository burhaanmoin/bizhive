package com.biz.hive.service;

import com.biz.hive.entity.Admin;
import com.biz.hive.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Optional<Admin> findByEmailAndPassword(String email, String password) {
        return adminRepository.findByEmailAndPassword(email, password);
    }

    // Get all admins
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    // Get admin by ID
    public Optional<Admin> getAdminById(Long id) {
        return adminRepository.findById(id);
    }

    // Get admin by email
    public Optional<Admin> getAdminByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    // Create a new admin
    public Admin createAdmin(Admin admin) {
        if (adminRepository.existsByEmail(admin.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        admin.setCreatedAt(LocalDateTime.now().toString());
        return adminRepository.save(admin);
    }

    // Update an existing admin
    public Admin updateAdmin(Long id, Admin updatedAdmin) {
        return adminRepository.findById(id).map(admin -> {
            admin.setName(updatedAdmin.getName());
            admin.setEmail(updatedAdmin.getEmail());
            admin.setPassword(updatedAdmin.getPassword());
            admin.setUpdatedAt(LocalDateTime.now().toString());
            return adminRepository.save(admin);
        }).orElseThrow(() -> new RuntimeException("Admin not found"));
    }

    // Delete an admin by ID
    public void deleteAdmin(Long id) {
        if (!adminRepository.existsById(id)) {
            throw new RuntimeException("Admin not found");
        }
        adminRepository.deleteById(id);
    }
}
