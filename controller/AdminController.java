package com.biz.hive.controller;

import com.biz.hive.entity.Admin;
import com.biz.hive.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

    @RestController
    @RequestMapping("/admins")
    @CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
    public class AdminController {

        @Autowired
        private AdminService adminService;

        // ✅ Get all admins
        @GetMapping
        public ResponseEntity<List<Admin>> getAllAdmins() {
            List<Admin> admins = adminService.getAllAdmins();
            return ResponseEntity.ok(admins);
        }

        // ✅ Get admin by ID
        @GetMapping("/{id}")
        public ResponseEntity<?> getAdminById(@PathVariable Long id) {
            Optional<Admin> admin = adminService.getAdminById(id);

            if (admin.isPresent()) {
                return ResponseEntity.ok(admin.get());
            } else {
                return ResponseEntity.status(404)
                        .body(Map.of("success", false, "message", "Admin not found with ID: " + id));
            }
        }

        // ✅ Get admin by Email
        @GetMapping("/email/{email}")
        public ResponseEntity<?> getAdminByEmail(@PathVariable String email) {
            Optional<Admin> admin = adminService.getAdminByEmail(email);

            if (admin.isPresent()) {
                return ResponseEntity.ok(admin.get());
            } else {
                return ResponseEntity.status(404)
                        .body(Map.of("success", false, "message", "Admin not found with email: " + email));
            }
        }

        // ✅ Create a new admin
        @PostMapping("/create")
        public ResponseEntity<?> createAdmin(@RequestBody Admin admin) {
            try {
                Admin savedAdmin = adminService.createAdmin(admin);
                return ResponseEntity.ok(savedAdmin);
            } catch (Exception e) {
                return ResponseEntity.status(500)
                        .body(Map.of("success", false, "message", "Error creating admin: " + e.getMessage()));
            }
        }

        // ✅ Update admin details
        @PutMapping("/update/{id}")
        public ResponseEntity<?> updateAdmin(@PathVariable Long id, @RequestBody Admin updatedAdmin) {
            try {
                Admin admin = adminService.updateAdmin(id, updatedAdmin);
                return ResponseEntity.ok(admin);
            } catch (Exception e) {
                return ResponseEntity.status(500)
                        .body(Map.of("success", false, "message", "Error updating admin: " + e.getMessage()));
            }
        }

        // ✅ Delete an admin
        @DeleteMapping("/delete/{id}")
        public ResponseEntity<?> deleteAdmin(@PathVariable Long id) {
            try {
                adminService.deleteAdmin(id);
                return ResponseEntity.ok(Map.of("success", true, "message", "Admin deleted successfully!"));
            } catch (Exception e) {
                return ResponseEntity.status(500)
                        .body(Map.of("success", false, "message", "Error deleting admin: " + e.getMessage()));
            }
        }
    }

