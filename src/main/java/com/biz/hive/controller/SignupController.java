package com.biz.hive.controller;

import com.biz.hive.entity.Enterprise;
import com.biz.hive.service.EnterpriseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class SignupController {

    @Autowired
    private EnterpriseService enterpriseService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerEnterprise(@RequestBody Enterprise enterprise) {
        System.out.println("📌 Received Signup Request for: " + enterprise.getEmail());

        try {
            // Check if email is already registered
            if (enterpriseService.emailExists(enterprise.getEmail())) {
                System.out.println("❌ Email already exists: " + enterprise.getEmail());
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Map.of("success", false, "message", "Email already exists"));
            }

            // Check if phone number is already registered
            if (enterpriseService.phoneExists(enterprise.getPhoneNumber())) {
                System.out.println("❌ Phone number already registered: " + enterprise.getPhoneNumber());
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Map.of("success", false, "message", "Phone number already registered"));
            }

            // Save new enterprise
            Enterprise savedEnterprise = enterpriseService.saveEnterprise(enterprise);
            System.out.println("✅ Enterprise Registered: " + savedEnterprise.getLoginId());

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Enterprise registered successfully",
                    "enterpriseId", savedEnterprise.getId()
            ));

        } catch (Exception e) {
            System.err.println("🔥 Error registering enterprise: " + e.getMessage());
            e.printStackTrace(); // Print full error stack trace for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("success", false, "message", "Internal server error: " + e.getMessage()));
        }
    }
}
