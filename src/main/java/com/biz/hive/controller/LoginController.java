package com.biz.hive.controller;

import com.biz.hive.entity.Admin;
import com.biz.hive.entity.Enterprise;
import com.biz.hive.service.AdminService;
import com.biz.hive.service.EnterpriseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class LoginController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private EnterpriseService enterpriseService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        System.out.println("🔍 Checking login for email: " + email);
        try {
            Optional<Admin> admin = adminService.findByEmailAndPassword(email, password);
            if (admin.isPresent()) {
                System.out.println("✅ Admin found: " + admin.get().getEmail());
                return ResponseEntity.ok(Map.of(
                        "success", true,
                        "role", "ADMIN",
                        "adminDetails", admin.get()
                ));
            }
            Optional<Enterprise> enterprise = enterpriseService.findByEmailAndPassword(email, password);
            if (enterprise.isPresent()) {
                System.out.println("✅ Enterprise User found: " + enterprise.get().getEmail());
                return ResponseEntity.ok(Map.of(
                        "success", true,
                        "role", "ENTERPRISE",
                        "enterpriseDetails", enterprise.get()
                ));
            }
            System.out.println("❌ Invalid credentials for email: " + email);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "success", false,
                    "message", "Invalid credentials"
            ));
        } catch (Exception e) {
            System.err.println("🔥 Error during login: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Internal server error"
            ));
        }
    }
}
