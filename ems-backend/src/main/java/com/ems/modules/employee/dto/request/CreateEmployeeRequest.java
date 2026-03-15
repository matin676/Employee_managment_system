package com.ems.modules.employee.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CreateEmployeeRequest {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    private LocalDate dateOfBirth;

    private String gender;

    private String phone;

    private String nationalId;

    private String address;

    @NotBlank(message = "Department is required")
    private String department;

    private String qualification;

    private String profileImageUrl;

    @NotNull(message = "Salary is required")
    @DecimalMin(value = "0", message = "Salary must be positive")
    private BigDecimal salary;
}
