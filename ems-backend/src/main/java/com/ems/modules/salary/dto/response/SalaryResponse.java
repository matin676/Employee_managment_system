package com.ems.modules.salary.dto.response;

import com.ems.entity.Salary.PaymentStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
@Builder
public class SalaryResponse {
    private UUID id;
    private UUID employeeId;
    private String employeeName;
    private BigDecimal baseSalary;
    private BigDecimal bonuses;
    private BigDecimal deductions;
    private BigDecimal totalSalary;
    private LocalDate paymentDate;
    private String monthYear;
    private PaymentStatus status;
}
