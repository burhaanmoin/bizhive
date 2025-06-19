package com.biz.hive.repository;

import com.biz.hive.entity.EnterpriseReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EnterpriseReportRepository extends JpaRepository<EnterpriseReport, Long> {
    List<EnterpriseReport> findByEnterpriseId(Long enterpriseId);
} 