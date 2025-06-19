package com.biz.hive.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "enterprise_reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EnterpriseReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enterprise_id", nullable = false)
    private Enterprise enterprise;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String period;

    @Column(nullable = false)
    private String revenue;

    @Column(nullable = false)
    private Integer orders;

    @Column(nullable = false)
    private String growth;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
} 