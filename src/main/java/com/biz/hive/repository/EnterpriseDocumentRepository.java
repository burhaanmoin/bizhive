package com.biz.hive.repository;

import com.biz.hive.entity.EnterpriseDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EnterpriseDocumentRepository extends JpaRepository<EnterpriseDocument, Long> {
    List<EnterpriseDocument> findByEnterpriseId(Long enterpriseId);
} 