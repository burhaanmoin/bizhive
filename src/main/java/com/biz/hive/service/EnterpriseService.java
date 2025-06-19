package com.biz.hive.service;

import com.biz.hive.entity.Enterprise;
import com.biz.hive.entity.EnterpriseDocument;
import com.biz.hive.entity.EnterpriseReport;
import com.biz.hive.repository.EnterpriseRepository;
import com.biz.hive.repository.EnterpriseDocumentRepository;
import com.biz.hive.repository.EnterpriseReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnterpriseService {

    @Autowired
    private EnterpriseRepository enterpriseRepository;

    @Autowired
    private EnterpriseDocumentRepository documentRepository;

    @Autowired
    private EnterpriseReportRepository reportRepository;

    public Optional<Enterprise> findByEmailAndPassword(String email, String password) {
        return enterpriseRepository.findByEmailAndPassword(email, password);
    }

    public Optional<Enterprise> findByLoginId(String loginId) {
        return enterpriseRepository.findByLoginId(loginId);
    }

    public Enterprise saveEnterprise(Enterprise enterprise) {
        return enterpriseRepository.save(enterprise);
    }

    public boolean emailExists(String email) {
        return enterpriseRepository.existsByEmail(email);
    }

    public boolean phoneExists(String phoneNumber) {
        return enterpriseRepository.existsByPhoneNumber(phoneNumber);
    }

    public Optional<Enterprise> getEnterpriseById(Long id) {
        return enterpriseRepository.findById(id);
    }

    public List<EnterpriseDocument> getDocumentsByEnterpriseId(Long id) {
        return documentRepository.findByEnterpriseId(id);
    }

    public List<EnterpriseReport> getReportsByEnterpriseId(Long id) {
        return reportRepository.findByEnterpriseId(id);
    }

    public EnterpriseDocument saveDocument(EnterpriseDocument doc) {
        return documentRepository.save(doc);
    }

    public EnterpriseReport saveReport(EnterpriseReport report) {
        return reportRepository.save(report);
    }

    public void deleteDocument(Long docId) {
        documentRepository.deleteById(docId);
    }

    public void deleteReport(Long reportId) {
        reportRepository.deleteById(reportId);
    }
}
