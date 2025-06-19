package com.biz.hive.repository;

import com.biz.hive.entity.Enterprise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EnterpriseRepository extends JpaRepository<Enterprise, Long> {

    Optional<Enterprise> findByEmailAndPassword(String email, String password);

    Optional<Enterprise> findByLoginId(String loginId);

    boolean existsByEmail(String email);

    boolean existsByPhoneNumber(String phoneNumber);
}
