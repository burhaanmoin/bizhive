package com.biz.hive.entity;

import jakarta.persistence.*;
import lombok.*;
import java.sql.Blob;
import java.time.LocalDateTime;

@Entity
@Table(name = "enterprise_documents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "data")
public class EnterpriseDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enterprise_id", nullable = false)
    private Enterprise enterprise;

    @Column(nullable = false)
    private String name;

    @Lob
    @Column(nullable = false)
    private Blob data;

    @Column(name = "last_updated", nullable = false)
    private LocalDateTime lastUpdated;

    @Column(nullable = false)
    private String status;
} 