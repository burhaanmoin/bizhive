package com.biz.hive.controller;

import com.biz.hive.entity.Enterprise;
import com.biz.hive.entity.EnterpriseDocument;
import com.biz.hive.entity.EnterpriseReport;
import com.biz.hive.service.EnterpriseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/enterprise")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class EnterpriseController {
    @Autowired
    private EnterpriseService enterpriseService;

    @GetMapping("/{id}")
    public ResponseEntity<Enterprise> getEnterpriseById(@PathVariable Long id) {
        Optional<Enterprise> enterprise = enterpriseService.getEnterpriseById(id);
        return enterprise.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/documents")
    public ResponseEntity<List<EnterpriseDocument>> getDocuments(@PathVariable Long id) {
        return ResponseEntity.ok(enterpriseService.getDocumentsByEnterpriseId(id));
    }

    @GetMapping("/{id}/reports")
    public ResponseEntity<List<EnterpriseReport>> getReports(@PathVariable Long id) {
        return ResponseEntity.ok(enterpriseService.getReportsByEnterpriseId(id));
    }

    @PostMapping("/{id}/documents")
    public ResponseEntity<?> uploadDocument(@PathVariable Long id, @RequestParam("file") MultipartFile file, @RequestParam("name") String name, @RequestParam("status") String status) {
        try {
            Optional<Enterprise> enterpriseOpt = enterpriseService.getEnterpriseById(id);
            if (enterpriseOpt.isEmpty()) return ResponseEntity.notFound().build();
            EnterpriseDocument doc = new EnterpriseDocument();
            doc.setEnterprise(enterpriseOpt.get());
            doc.setName(name);
            doc.setData(new javax.sql.rowset.serial.SerialBlob(file.getBytes()));
            doc.setLastUpdated(LocalDateTime.now());
            doc.setStatus(status);
            enterpriseService.saveDocument(doc);
            return ResponseEntity.status(HttpStatus.CREATED).body("Document uploaded");
        } catch (IOException | SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading document");
        }
    }

    @PostMapping("/{id}/reports")
    public ResponseEntity<?> uploadReport(@PathVariable Long id, @RequestBody EnterpriseReport report) {
        Optional<Enterprise> enterpriseOpt = enterpriseService.getEnterpriseById(id);
        if (enterpriseOpt.isEmpty()) return ResponseEntity.notFound().build();
        report.setEnterprise(enterpriseOpt.get());
        enterpriseService.saveReport(report);
        return ResponseEntity.status(HttpStatus.CREATED).body("Report uploaded");
    }

    @DeleteMapping("/documents/{docId}")
    public ResponseEntity<?> deleteDocument(@PathVariable Long docId) {
        enterpriseService.deleteDocument(docId);
        return ResponseEntity.ok("Document deleted");
    }

    @DeleteMapping("/reports/{reportId}")
    public ResponseEntity<?> deleteReport(@PathVariable Long reportId) {
        enterpriseService.deleteReport(reportId);
        return ResponseEntity.ok("Report deleted");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Enterprise> updateEnterprise(@PathVariable Long id, @RequestBody Enterprise updated) {
        Optional<Enterprise> opt = enterpriseService.getEnterpriseById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();
        Enterprise ent = opt.get();
        // Update all fields except id and relationships
        ent.setFullName(updated.getFullName());
        ent.setLoginId(updated.getLoginId());
        ent.setPassword(updated.getPassword());
        ent.setPhoneNumber(updated.getPhoneNumber());
        ent.setEmail(updated.getEmail());
        ent.setEnterpriseName(updated.getEnterpriseName());
        ent.setEnterpriseType(updated.getEnterpriseType());
        ent.setMsmeRegNo(updated.getMsmeRegNo());
        ent.setGstin(updated.getGstin());
        ent.setEstablishmentYear(updated.getEstablishmentYear());
        ent.setStreetAddress(updated.getStreetAddress());
        ent.setCity(updated.getCity());
        ent.setState(updated.getState());
        ent.setPincode(updated.getPincode());
        ent.setTypeOfBusiness(updated.getTypeOfBusiness());
        ent.setEmployeeCount(updated.getEmployeeCount());
        ent.setAnnualTurnover(updated.getAnnualTurnover());
        ent.setRegisteredAddress(updated.getRegisteredAddress());
        ent.setFactoryLocation(updated.getFactoryLocation());
        ent.setBranchOffices(updated.getBranchOffices());
        ent.setMsmeRegistrationStatus(updated.getMsmeRegistrationStatus());
        ent.setGstStatus(updated.getGstStatus());
        ent.setFactoryLicenseStatus(updated.getFactoryLicenseStatus());
        ent.setPrimaryContact(updated.getPrimaryContact());
        // Save and return
        Enterprise saved = enterpriseService.saveEnterprise(ent);
        return ResponseEntity.ok(saved);
    }
} 