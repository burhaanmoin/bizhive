package com.biz.hive.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "enterprises")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Enterprise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Personal Information
    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "login_id", unique = true, nullable = false)
    private String loginId;

    @Column(nullable = false)
    private String password;

    @Column(name = "phone_number", nullable = false, unique = true)
    private String phoneNumber;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    // Enterprise Information
    @Column(name = "enterprise_name", nullable = false)
    private String enterpriseName;

    @Column(name = "enterprise_type", nullable = false)
    private String enterpriseType;

    @Column(name = "msme_reg_no")
    private String msmeRegNo;

    @Column(name = "gstin")
    private String gstin;

    @Column(name = "establishment_year", nullable = false)
    private int establishmentYear;

    // Address Information
    @Column(name = "street_address", nullable = false)
    private String streetAddress;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "state", nullable = false)
    private String state;

    @Column(name = "pincode", nullable = false)
    private String pincode;

    // Business Details
    @Column(name = "type_of_business")
    private String typeOfBusiness;

    @Column(name = "employee_count")
    private Integer employeeCount;

    @Column(name = "annual_turnover")
    private String annualTurnover;

    // Location Details
    @Column(name = "registered_address")
    private String registeredAddress;

    @Column(name = "factory_location")
    private String factoryLocation;

    @Column(name = "branch_offices")
    private String branchOffices;

    // Compliance Status
    @Column(name = "msme_registration_status")
    private String msmeRegistrationStatus;

    @Column(name = "gst_status")
    private String gstStatus;

    @Column(name = "factory_license_status")
    private String factoryLicenseStatus;

    // Contact Information
    @Column(name = "primary_contact")
    private String primaryContact;

    // Relationships
    @OneToMany(mappedBy = "enterprise", cascade = CascadeType.ALL, orphanRemoval = true)
    private java.util.List<EnterpriseDocument> documents = new java.util.ArrayList<>();

    @OneToMany(mappedBy = "enterprise", cascade = CascadeType.ALL, orphanRemoval = true)
    private java.util.List<EnterpriseReport> reports = new java.util.ArrayList<>();
}
