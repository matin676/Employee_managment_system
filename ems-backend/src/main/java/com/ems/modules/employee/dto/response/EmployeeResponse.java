package com.ems.modules.employee.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeResponse {
    private UUID id;
    private UUID userId;
    private String firstName;
    private String lastName;
    private String fullName;
    private String email;
    private LocalDate dateOfBirth;
    private String gender;
    private String phone;
    private String nationalId;
    private String address;
    private String department;
    private String qualification;
    private String profileImageUrl;
    private LocalDateTime createdAt;
    private java.math.BigDecimal baseSalary;
}
